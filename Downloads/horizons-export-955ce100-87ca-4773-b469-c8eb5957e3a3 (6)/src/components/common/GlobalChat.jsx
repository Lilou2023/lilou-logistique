import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2, AlertTriangle, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';

const getInitials = (name) => {
    if (!name) return '??';
    const names = name.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`
      : names[0][0];
};

const GlobalChat = () => {
    const { profile } = useAuth();
    const { toast } = useToast();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data, error } = await supabase
                    .from('chat_messages')
                    .select(`
                        *,
                        user_profiles ( full_name, avatar_url )
                    `)
                    .eq('channel', 'global')
                    .order('created_at', { ascending: true })
                    .limit(50);
                if (error) throw error;
                setMessages(data);
            } catch (err) {
                setError('Impossible de charger les messages.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();

        const channel = supabase
            .channel('public:chat_messages:global')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: 'channel=eq.global' }, async (payload) => {
                const { data: profileData, error: profileError } = await supabase
                    .from('user_profiles')
                    .select('full_name, avatar_url')
                    .eq('id', payload.new.sender_id)
                    .single();
                
                if (profileError) console.error("Error fetching profile for new message:", profileError);

                setMessages(currentMessages => [...currentMessages, { ...payload.new, user_profiles: profileData }]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !profile) return;

        try {
            const { error } = await supabase
                .from('chat_messages')
                .insert({ message: newMessage, sender_id: profile.id, channel: 'global' });
            
            if (error) throw error;
            setNewMessage('');
        } catch (err) {
            toast({ variant: 'destructive', title: 'Erreur', description: "Impossible d'envoyer le message." });
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare /> Chat Global</CardTitle>
                <CardDescription>Canal de communication pour tous les utilisateurs.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-4 space-y-4">
                    {loading && <div className="flex justify-center items-center h-full"><Loader2 className="h-6 w-6 animate-spin" /></div>}
                    {error && <div className="flex justify-center items-center h-full text-destructive"><AlertTriangle className="h-5 w-5 mr-2" />{error}</div>}
                    <AnimatePresence>
                        {messages.map(msg => (
                            <motion.div
                                key={msg.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`flex items-start gap-3 ${msg.sender_id === profile?.id ? 'justify-end' : ''}`}
                            >
                                {msg.sender_id !== profile?.id && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={msg.user_profiles?.avatar_url} />
                                        <AvatarFallback>{getInitials(msg.user_profiles?.full_name)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`max-w-xs p-3 rounded-2xl ${msg.sender_id === profile?.id ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'}`}>
                                    {msg.sender_id !== profile?.id && <p className="text-xs font-bold mb-1">{msg.user_profiles?.full_name || 'Utilisateur'}</p>}
                                    <p className="text-sm">{msg.message}</p>
                                    <p className="text-xs opacity-70 mt-1 text-right">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                {msg.sender_id === profile?.id && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={profile?.avatar_url} />
                                        <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                                    </Avatar>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre message..."
                        autoComplete="off"
                    />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default GlobalChat;