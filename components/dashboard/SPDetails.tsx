import Card from '@/components/ui/Card';
import { SP_DETAILS_TITLE, SP_LABELS } from '@/constants';
import { SPDetails as SPDetailsType } from '@/types';

interface SPDetailsProps {
    data: SPDetailsType;
}

export default function SPDetails({ data }: SPDetailsProps) {
    return (
        <Card title={SP_DETAILS_TITLE}>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-amber-900">{SP_LABELS.fresh}</span>
                    <div className="flex gap-4">
                        <span className="font-semibold text-amber-950">{data.fresh}</span>
                        <span className="font-semibold text-amber-950">{data.fresh}</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="text-amber-900">{SP_LABELS.cf}</span>
                    <span className="font-semibold text-amber-950">{data.cf}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-amber-900">{SP_LABELS.directSP}</span>
                    <span className="font-semibold text-amber-950">{data.directSP}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-amber-900">{SP_LABELS.selfSP}</span>
                    <span className="font-semibold text-amber-950">{data.selfSP}</span>
                </div>
            </div>
        </Card>
    );
}
