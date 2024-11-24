// OrderStatus.ts
export interface OrderStatus {
    id: string;
    order_id: string;
    order_status: string;
}

// DeliveryTimeline.tsx
import React from 'react';
import { Package, Truck, XCircle, AlertCircle, CheckCircle, LucideIcon } from 'lucide-react';

interface DeliveryTimelineProps {
    data: OrderStatus[];
}

type StatusIconMap = {
    [key: string]: LucideIcon;
};

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ data }) => {
    // Status icon mapping with TypeScript
    const statusIcons: StatusIconMap = {
        pending: AlertCircle,
        pickup: Package,
        'on the way': Truck,
        'out for delivery': Truck,
        'pickup cancelled': XCircle,
        delivered: CheckCircle,
    };

    // Helper function to get icon based on status
    const getStatusIcon = (status: string): LucideIcon => {
        const normalizedStatus = status.toLowerCase();
        return statusIcons[normalizedStatus] || CheckCircle;
    };

    // Helper function to determine if step is completed
    const isStepCompleted = (currentIndex: number, targetIndex: number, isCancelled: boolean): boolean => {
        if (isCancelled) {
            return currentIndex <= targetIndex;
        }
        return currentIndex < targetIndex;
    };

    // Check if order is cancelled
    const isOrderCancelled: boolean = data?.some(
        (item) => item.order_status.toLowerCase() === 'pickup cancelled'
    );

    // Helper function for status-based styles
    const getStatusStyles = (status: any): {
        backgroundColor: string;
        textColor: string;
    } => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === 'pickup cancelled') {
            return {
                backgroundColor: 'bg-red-500',
                textColor: 'text-white',
            };
        }
        return {
            backgroundColor: 'bg-green-500',
            textColor: 'text-white',
        };
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Mobile View (Vertical) */}
            <div className="md:hidden space-y-8">
                {data.map((step, index) => {
                    const StatusIcon = getStatusIcon(step.order_status);
                    const isCompleted = isStepCompleted(index, data.length, isOrderCancelled);
                    const { backgroundColor, textColor } = getStatusStyles(step.order_status);

                    return (
                        <div key={step.id}>
                            <div className="flex items-center mb-4">
                                <div
                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                      ${step.order_status.toLowerCase() === 'pickup cancelled'
                                            ? 'bg-red-500'
                                            : isCompleted
                                                ? 'bg-green-500'
                                                : 'bg-gray-200'
                                        }`}
                                >
                                    <StatusIcon
                                        className={`w-6 h-6 ${isCompleted || step.order_status.toLowerCase() === 'pickup cancelled'
                                            ? 'text-white'
                                            : 'text-gray-400'
                                            }`}
                                    />
                                </div>
                                <div className="ml-4">
                                    <h3
                                        className={`text-lg font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-400'
                                            }`}
                                    >
                                        {step.order_status}
                                    </h3>

                                </div>
                            </div>
                            {index < data.length - 1 && (
                                <div className="md:ml-5">
                                    <div
                                        className={`w-0.5 h-12 ml-[1.15rem] ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                            }`}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Laptop View (Horizontal) */}
            <div className="hidden md:block">
                <div className="flex items-center justify-between">
                    {data.map((step, index) => {
                        const StatusIcon = getStatusIcon(step.order_status);
                        const isCompleted = isStepCompleted(index, data.length, isOrderCancelled);

                        return (
                            <div key={step.id} className="flex flex-col items-center relative w-full">
                                {/* Connection Line */}
                                {index < data.length - 1 && (
                                    <div className="absolute w-full h-0.5 bg-gray-200 top-5 left-1/2 transform -translate-y-1/2">
                                        <div
                                            className={`h-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                                }`}
                                            style={{
                                                width: isCompleted ? '100%' : '0%',
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Step Icon */}
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                      ${step.order_status.toLowerCase() === 'pickup cancelled'
                                            ? 'bg-red-500'
                                            : isCompleted
                                                ? 'bg-green-500'
                                                : 'bg-gray-200'
                                        } 
                      transition-all duration-300`}
                                >
                                    <StatusIcon
                                        className={`w-6 h-6 ${isCompleted || step.order_status.toLowerCase() === 'pickup cancelled'
                                            ? 'text-white'
                                            : 'text-gray-400'
                                            }`}
                                    />
                                </div>

                                {/* Step Details */}
                                <div className="mt-4 text-center w-32">
                                    <h3
                                        className={`text-sm font-medium mb-1 ${isCompleted ? 'text-gray-900' : 'text-gray-400'
                                            }`}
                                    >
                                        {step.order_status}
                                    </h3>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DeliveryTimeline;