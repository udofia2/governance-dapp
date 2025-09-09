import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "../../lib/utils";
import { formatEther } from "viem";
import { useMemo } from "react";
import clsx from "clsx";

const ProposalCard = ({
    id,
    description,
    recipient,
    amount,
    voteCount,
    deadline,
    executed,
    hasVoted,
    handleVote,
    handleExecute,
    quorum,
}) => {
    const isExpired = useMemo(() => {
        return Math.round(Date.now() / 1000) > Number(deadline);
    }, [deadline]);
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Proposal #{id}</span>
                    <span>Vote Count: {voteCount}</span>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <span>Recipient: </span>
                    <span>{shortenAddress(recipient, 4)}</span>
                </div>
                <div>
                    <span>Amount: </span>
                    <span>{formatEther(amount)}</span>
                </div>
                <div>
                    <span>Deadline: </span>
                    <span>{deadline}</span>
                </div>
                <div>
                    <span>Executed: </span>
                    <span>{String(executed)}</span>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button
                    onClick={() => handleVote(id)}
                    disabled={hasVoted || isExpired}
                    type="submit"
                    className={clsx({
                        "w-full": voteCount < quorum,
                        "w-1/2": voteCount >= quorum,
                    })}
                >
                    Vote
                </Button>
                {voteCount >= quorum && (
                    <Button
                        onClick={() => handleExecute(id)}
                        disabled={executed}
                        type="submit"
                        className="w-1/2"
                    >
                        Execute
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default ProposalCard;
