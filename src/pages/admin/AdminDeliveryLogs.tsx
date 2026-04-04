import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, CheckCircle2, XCircle, Terminal } from 'lucide-react';
import { toast } from 'sonner';

interface DeliveryLog {
  id: string;
  purchase_id: string;
  channel: string;
  endpoint: string;
  success: boolean;
  response_code: number;
  retry_count: number;
  attempted_at: string;
  error_details: string;
  purchases: {
    lead_id: string;
    dealer_id: string;
    dealers: {
      dealership_name: string;
    }
  }
}

export default function AdminDeliveryLogs() {
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('delivery_logs')
      .select(`
        *,
        purchases (
          lead_id,
          dealer_id,
          dealers ( dealership_name )
        )
      `)
      .order('attempted_at', { ascending: false })
      .limit(100);
    
    if (error) toast.error(error.message);
    else setLogs((data || []) as any[]);
    setLoading(false);
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Terminal className="h-8 w-8 text-maya-navy" />
            Delivery Logs
          </h1>
          <p className="text-muted-foreground mt-1">Review webhook and CRM delivery attempts.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Dealer</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Loading logs...</TableCell></TableRow>
            ) : logs.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No delivery logs found.</TableCell></TableRow>
            ) : logs.map(l => (
              <TableRow key={l.id}>
                <TableCell className="text-sm whitespace-nowrap">{new Date(l.attempted_at).toLocaleString()}</TableCell>
                <TableCell className="font-medium">{l.purchases?.dealers?.dealership_name || 'Unknown'}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="uppercase text-xs">{l.channel}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs max-w-[200px] truncate" title={l.endpoint}>{l.endpoint}</TableCell>
                <TableCell>
                  {l.success ? (
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Success ({l.response_code})
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      <XCircle className="h-3 w-3 mr-1" /> Failed ({l.response_code || 'N/A'})
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {l.error_details ? (
                    <span className="text-xs text-red-600 max-w-xs block truncate" title={l.error_details}>{l.error_details}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Retry: {l.retry_count}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
