import Card from '@/components/ui/Card';
import { ID_STATUS_TITLE, ID_LABELS } from '@/constants';
import { IDStatus as IDStatusType } from '@/types';

interface IDStatusProps {
    data: IDStatusType;
}

export default function IDStatus({ data }: IDStatusProps) {
    return (
        <Card title={ID_STATUS_TITLE}>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-amber-900">{ID_LABELS.status}</span>
                    <span className={`font-semibold ${data.status === 'Active' ? 'text-green-700' : 'text-red-700'
                        }`}>
                        {data.status} <span className="text-red-600">Inactive</span>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-amber-900">{ID_LABELS.doi}</span>
                    <span className="font-semibold text-amber-950">{data.doi}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-amber-900">{ID_LABELS.doa}</span>
                    <span className="font-semibold text-amber-950">{data.doa}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-amber-900">{ID_LABELS.validityDate}</span>
                    <span className="font-semibold text-red-600">{data.validityDate}</span>
                </div>
            </div>
        </Card>
    );
}
