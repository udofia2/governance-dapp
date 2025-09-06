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
import { useState } from "react";
import { DateTimePicker } from "../DateTimePicker";
import useCreateProposal from "../../hooks/useCreateProposal";
import { parseEther } from "viem";

export function CreateProposalModal() {
    const [description, setDecription] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [deadline, setDeadline] = useState();
    const createProposal = useCreateProposal();

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
                                date={deadline}
                                setDate={setDeadline}
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
                                    deadline.valueOf() / 1000
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
