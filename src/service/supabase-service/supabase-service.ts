import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import config from '../../../config';


const supabaseUrl = config.supabase.url
const supabaseKey = config.supabase.key
export const supabase = createClient(supabaseUrl, supabaseKey);


export interface User {
  id: string;
  email: string;
  full_name: string;
  qr_code: string;
  created_at: string;
  department?: string;
}

export interface Recognition {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  created_at: string;
  category?: string;
  from_user?: User;
  to_user?: User;
}

export interface LeaderboardEntry {
  to_user_id: string;
  full_name: string;
  month: string;
  recognition_count: number;
  rank: number;
}

export function useAuth() {
  const [user, setUser] = useState(supabase.auth.getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;
        setUser(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchUser();
  }, [userId]);

  return { user, loading, error };
}

export function useRecognitions(userId?: string) {
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRecognitions() {
      try {
        let query = supabase
          .from('recognitions')
          .select(`
            *,
            from_user:users!recognitions_from_user_id_fkey(id, full_name),
            to_user:users!recognitions_to_user_id_fkey(id, full_name)
          `)
          .order('created_at', { ascending: false });

        if (userId) {
          query = query.or(`to_user_id.eq.${userId},from_user_id.eq.${userId}`);
        }

        const { data, error } = await query;
        if (error) throw error;
        setRecognitions(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecognitions();
  }, [userId]);

  const createRecognition = async (recognition: Omit<Recognition, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('recognitions')
        .insert(recognition)
        .select()
        .single();
  
      if (error) throw error;
      setRecognitions(prev => [data, ...prev]);
      return data;
    };

  return { recognitions, loading, error, createRecognition };
}

export function useLeaderboard(month?: string) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        let query = supabase
          .from('monthly_leaderboard')
          .select('*')
          .order('rank', { ascending: true });

        if (month) {
          query = query.eq('month', month);
        }

        const { data, error } = await query;
        if (error) throw error;
        setLeaderboard(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [month]);

  return { leaderboard, loading, error };
}

export function useGenerateQRCode(userId: string) {
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function generateQR() {
      try {
       
        const code = await QRCode.toDataURL(`user:${userId}`);
        setQRCode(code);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) generateQR();
  }, [userId]);

  return { qrCode, loading, error };
}
