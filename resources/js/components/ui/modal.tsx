import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
};

export function Modal({
    open,
    onOpenChange,
    title,
    description,
    children,
}: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-green-light bg-white/95 shadow-2xl backdrop-blur">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-slate-950">
                        {title}
                    </DialogTitle>
                    {description ? (
                        <DialogDescription className="text-slate-600">
                            {description}
                        </DialogDescription>
                    ) : null}
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}
