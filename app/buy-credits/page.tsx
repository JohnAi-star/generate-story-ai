"use client";
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react';
import { UserDetailContext } from '../_context/UserDetailContext';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function BuyCredits() {
    const Options = [
        {
            id: 1,
            price: 5,
            credits: 50,
            name: 'Standard Plan',
            color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
            crossedOutPrice: 9.99,
        },
        {
            id: 2,
            price: 9.99,
            credits: 150,
            name: 'Basic Plan',
            color: 'bg-gradient-to-r from-green-400 to-blue-500',
            crossedOutPrice: 14.99,
        },
        {
            id: 3,
            price: 19.99,
            credits: 300,
            name: 'Pro Plan',
            color: 'bg-gradient-to-r from-yellow-400 to-red-500',
            crossedOutPrice: 29.99,
        },
    ];

    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();
    const notify = (msg: string) => toast(msg);
    const notifyError = (msg: string) => toast.error(msg);

    useEffect(() => {
        if (selectedOption !== 0) {
            const price = Options[selectedOption - 1].price;
            setSelectedPrice(price);
        }
    }, [selectedOption]);

    const OnPaymentSuccess = async () => {
        const result = await db.update(Users)
            .set({
                credit: Options[selectedOption - 1].credits + userDetail.credits
            }).where(eq(Users.userEmail, userDetail.userEmail));

        if (result) {
            notify("Payment Successful, Credits added");
            setUserDetail((prev: any) => ({
                ...prev,
                credit: Options[selectedOption - 1].credits + userDetail.credits
            }));
            router.replace('/dashboard');
        } else {
            notifyError("Server Error");
        }
    };

    return (
        <div className="min-h-screen p-10 md:px-20 lg:px-40 text-center" style={{ backgroundColor: "#c3dae9" }}>
            <h2 className="text-5xl font-extrabold text-primary-600 mb-10">Add More Credits</h2>

            <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
                {Options.map((option) => (
                    <div
                        key={option.id}
                        className={`relative p-6 w-full md:w-1/3 shadow-lg rounded-lg text-white cursor-pointer transition-transform transform hover:scale-105 ${option.color} 
                        ${selectedOption === option.id ? 'ring-4 ring-primary-400' : ''}`}
                        onClick={() => setSelectedOption(option.id)}
                    >
                        <h3 className="text-2xl font-bold mb-4">{option.name}</h3>
                        <p className="text-lg">Get {option.credits} Credits</p>
                        <p className="mt-4 text-3xl font-bold">
                            ${option.price.toFixed(2)} 
                            <span className="text-[#000] text-sm line-through">{` / ${option.crossedOutPrice.toFixed(2)}`}</span>
                        </p>
                        {selectedOption === option.id && (
                            <div className="absolute top-2 right-2 bg-white text-black font-bold text-xs px-2 py-1 rounded-lg">SELECTED</div>
                        )}
                        <p className="mt-2 text-lg"><span className="text-lg">✔️</span> Create {option.credits} Story</p>
                        <p className="mt-1 text-lg"><span className="text-lg">✔️</span> Free Download</p>
                        <p className="mt-1 text-lg"><span className="text-lg">✔️</span> Read Anytime</p>
                        <p className="mt-1 text-lg"><span className="text-lg">✔️</span> Read using text speech</p>
                    </div>
                ))}
            </div>

            <div className="mt-10 items-center justify-center">
                {selectedPrice > 0 && (
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        disabled={!selectedOption || selectedOption === 0}
                        onApprove={() => OnPaymentSuccess()}
                        onCancel={() => notifyError("Payment Canceled")}
                        createOrder={(data, actions) => {
                            //@ts-ignore
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: selectedPrice.toFixed(2), // Use dynamic price
                                            currency_code: 'USD'
                                        }
                                    }
                                ]
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default BuyCredits;
