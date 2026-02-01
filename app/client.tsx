import { createClient } from '@supabase/supabase-js';
const URL = 'https://zjschmywpblgwitcffsn.supabase.co';
const API_KEY = 'sb_publishable_wuyQuTfYKVCfbEKCmxFT3g_LDj6v6Lj';
export const supabase = createClient(URL, API_KEY)