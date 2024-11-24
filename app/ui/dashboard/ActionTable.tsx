"use client"
import { Minus, Plus } from 'lucide-react';
import { productStore } from '@/lib/hooks/useProductStore';
import { Button } from '../button';
export default function ActionTable({ purchase }: any) {
    const { showOrder, setShowOrder } = productStore();
    return (
        <div>
            <div className="flex space-x-2">
                <Button className="p-1 bg-blue-100 text-blue-600 rounded-full" >
                    {showOrder === purchase.id ? <Minus onClick={() => setShowOrder(null)} size={16} /> : <Plus onClick={() => setShowOrder(purchase.id)} size={16} />}
                </Button>

            </div>
        </div>
    )
}
