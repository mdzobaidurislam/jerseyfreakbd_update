"use client"
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { PartyPopper } from 'lucide-react';

const FirstTimeWelcomePopup = ({ translate }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');

    if (!hasSeenWelcome) {
      setIsOpen(true);
      // Mark that user has seen the welcome message
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full animate-bounce">
              <PartyPopper className="h-8 w-8 text-white" />
            </div>
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {translate?.welcome_come}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4 mt-4">
            <p className="text-gray-600">
              {translate?.congratulations}
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-700 mb-2">{translate?.get_started}</h3>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  {translate?.browse_through}
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-pink-500 mr-2"></div>
                  {translate?.add_favorites}
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  {translate?.complete_your_order}
                </li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
            onClick={handleClose}
          >
            {translate?.lets_get_started}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FirstTimeWelcomePopup;