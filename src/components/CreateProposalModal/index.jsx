import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { DateTimePicker } from "../DateTimePicker";
import {
    /* useCreateProposal, */ useCreateProposalEthers,
} from "../../hooks/useCreateProposal";
import { parseEther } from "viem";

export function CreateProposalModal() {
    const [description, setDecription] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    // const [deadline, setDeadline] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    // const createProposal = useCreateProposal();
    const createProposal = useCreateProposalEthers();

    const duration = useMemo(() => {
        if (!date || !time) return 0;

        const fullDate = new Date(date);
        const [hour, minutes, seconds] = time.split(":");
        fullDate.setHours(Number(hour), Number(minutes), Number(seconds));

        const val =
            Math.round(fullDate.valueOf() / 1000) -
            Math.round(Date.now() / 1000);
        return val;
    }, [date, time]);

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Create Propsal</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create a new Proposal</DialogTitle>
                        <DialogDescription>
                            Create a new proposal to be executed once all
                            requirements are reached
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                name="name"
                                placeholder="description"
                                value={description}
                                onChange={(e) => setDecription(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="recipient">Recipient</Label>
                            <Input
                                id="recipient"
                                name="recipient"
                                placeholder="0x..."
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="recipient">Amount</Label>
                            <Input
                                id="amount"
                                name="amount"
                                placeholder="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="recipient">deadline</Label>
                            <DateTimePicker
                                date={date}
                                setDate={setDate}
                                time={time}
                                setTime={setTime}
                            />
                        </div>
                    </div>
                    <DialogFooter className="w-full">
                        <Button
                            className="w-full"
                            type="submit"
                            onClick={() =>
                                createProposal(
                                    description,
                                    recipient,
                                    parseEther(amount),
                                    duration
                                )
                            }
                        >
                            Create Proposal
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
