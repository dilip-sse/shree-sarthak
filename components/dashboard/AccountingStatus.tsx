import Card from '@/components/ui/Card';
import { ACCOUNTING_STATUS_TITLE, ACCOUNTING_LABELS } from '@/constants';
import { AccountingStatus as AccountingStatusType } from '@/types';

interface AccountingStatusProps {
    data: AccountingStatusType;
}

export default function AccountingStatus({ data }: AccountingStatusProps) {
    return (
        <Card title={ACCOUNTING_STATUS_TITLE}>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-amber-900">{ACCOUNTING_LABELS.productFund}</span>
                    <span className="font-semibold text-amber-950">{data.productFundBalance}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-amber-900">{ACCOUNTING_LABELS.conOffer}</div>
                        <div className="text-amber-900">{ACCOUNTING_LABELS.grossIncome}</div>
                    </div>
                    <div className="text-right">
                        <div className="font-semibold text-amber-950">{data.conOfferBalance}</div>
                        <div className="font-semibold text-amber-950">{data.grossIncome}</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
