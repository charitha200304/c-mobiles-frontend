// src/components/SearchOverlay.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Search as SearchIcon } from 'lucide-react';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus the input when the overlay opens
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onClose();
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 animate-fadeIn">
            <Button
                variant="ghost"
                className="absolute top-4 right-4 text-white hover:bg-gray-800 h-10 w-10 p-2"
                onClick={onClose}
            >
                <X className="w-6 h-6" />
            </Button>

            <form onSubmit={handleSearch} className="w-full max-w-2xl flex items-center bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700">
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow bg-transparent text-white placeholder-gray-500 text-lg px-5 py-3 border-none focus:ring-0 focus:outline-none"
                />
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-colors h-full"
                    size="lg"
                >
                    <SearchIcon className="w-5 h-5 mr-2" /> Search
                </Button>
            </form>

            <div className="text-gray-400 text-sm mt-4">
                Press Enter to search, or Esc to close.
            </div>
        </div>
    );
}