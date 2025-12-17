import { DISTRIBUTOR_TITLE, DISTRIBUTOR_LABELS } from '@/constants';
import { DistributorInfo } from '@/types';

interface DistributorDetailsProps {
    data: DistributorInfo;
}

export default function DistributorDetails({ data }: DistributorDetailsProps) {
    return (
        <div className="bg-gradient-to-r from-amber-950 to-amber-900 text-white rounded-lg p-6 mt-8">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-white/30">
                {DISTRIBUTOR_TITLE}
            </h3>
            <div className="space-y-3">
                <div>
                    <span className="text-amber-200">{DISTRIBUTOR_LABELS.name} </span>
                    <span className="font-semibold">{data.name}</span>
                </div>
                <div>
                    <span className="text-amber-200">{DISTRIBUTOR_LABELS.sponsor} </span>
                    <span className="font-semibold">{data.sponsorId}</span>
                </div>
            </div>
        </div>
    );
}
