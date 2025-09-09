import React, { useCallback } from "react";
import useChairPerson from "./useChairPerson";
import { toast } from "sonner";
import { isAddressEqual } from "viem";
import {
    useAccount,
    usePublicClient,
    useWalletClient,
    useWriteContract,
} from "wagmi";
import { QUADRATIC_GOVERNANCE_VOTING_CONTRACT_ABI } from "../config/ABI";
import { useEthersSigner } from "./ethersAdapter";
import { ethers } from "ethers";

const useCreateProposal = () => {
    const { address } = useAccount();
    const chairPerson = useChairPerson();
    const walletClient = useWalletClient();
    const publicClient = usePublicClient();
    const { writeContractAsync } = useWriteContract();

    return useCallback(
        async (description, recipient, amountInwei, durationInSeconds) => {
            if (!address || !walletClient) {
                toast.error("Not connected", {
                    description: "Kindly connect your address",
                });
                return;
            }
            if (chairPerson && !isAddressEqual(address, chairPerson)) {
                toast.error("Unauthorized", {
                    description:
                        "This action is only available to the chairperson",
                });
                return;
            }

            if (durationInSeconds < 0) {
                toast.error("invalid duration", {
                    description:
                        "You cannot create a proposal with a time in the past as deadline",
                });
                return;
            }

            const governanceContractBalance = await publicClient.getBalance({
                address: import.meta.env
                    .VITE_QUADRATIC_GOVERNANCE_VOTING_CONTRACT,
            });

            console.log(
                "governanceContractBalance: ",
                governanceContractBalance,
                "amountInwei: ",
                amountInwei
            );

            if (governanceContractBalance < amountInwei) {
                toast.error("Insuffucient contract balance", {
                    description:
                        "The governance does not have enough ETH to fullfil this Proposal",
                });
                return;
            }

            console.log({
                description,
                recipient,
                amountInwei,
                durationInSeconds,
            });

            const txHash = await writeContractAsync({
                address: import.meta.env
                    .VITE_QUADRATIC_GOVERNANCE_VOTING_CONTRACT,
                abi: QUADRATIC_GOVERNANCE_VOTING_CONTRACT_ABI,
                functionName: "createProposal",
                args: [description, recipient, amountInwei, durationInSeconds],
            });

            console.log("txHash: ", txHash);

            const txReceipt = await publicClient.waitForTransactionReceipt({
                hash: txHash,
            });

            if (txReceipt.status === "success") {
                toast.success("Create proposal succeussfull", {
                    description: "You have successfully created a proposal",
                });
            } else {
                toast.error("Error creating proposal", {
                    description: "Proposal creation failed",
                });
            }
        },
        [address, chairPerson, publicClient, walletClient, writeContractAsync]
    );
};

export const useCreateProposalEthers = () => {
    const chairPerson = useChairPerson();
    const signer = useEthersSigner();

    // const provider = new ethers.BrowserProvider(<eip1193 provider>)

    return useCallback(
        async (description, recipient, amountInwei, durationInSeconds) => {
            // const singer = await provider.getSigner()
            const address = await signer.getAddress();
            if (!address || !signer) {
                toast.error("Not connected", {
                    description: "Kindly connect your account",
                });
                return;
            }
            if (
                chairPerson &&
                address.toLowerCase() !== chairPerson.toLowerCase()
            ) {
                toast.error("Unauthorized", {
                    description:
                        "This action is only available to the chairperson",
                });
                return;
            }

            if (durationInSeconds < 0) {
                toast.error("invalid duration", {
                    description:
                        "You cannot create a proposal with a time in the past as deadline",
                });
                return;
            }

            const governanceContractBalance = await signer.provider.getBalance(
                import.meta.env.VITE_QUADRATIC_GOVERNANCE_VOTING_CONTRACT
            );

            if (governanceContractBalance < amountInwei) {
                toast.error("Insuffucient contract balance", {
                    description:
                        "The governance does not have enough ETH to fullfil this Proposal",
                });
                return;
            }

            const governanceContract = new ethers.Contract(
                import.meta.env.VITE_QUADRATIC_GOVERNANCE_VOTING_CONTRACT,
                QUADRATIC_GOVERNANCE_VOTING_CONTRACT_ABI,
                signer
            );

            const txResponse = await governanceContract.createProposal(
                description,
                recipient,
                amountInwei,
                durationInSeconds
            );

            console.log("txHash: ", txResponse.hash);

            const txReceipt = await txResponse.wait();

            console.log("txReceipt: ", txReceipt);

            if (txReceipt.status) {
                toast.success("Create proposal succeussfull", {
                    description: "You have successfully created a proposal",
                });
            } else {
                toast.error("Error creating proposal", {
                    description: "Proposal creation failed",
                });
            }
        },
        [chairPerson, signer]
    );
};

export default useCreateProposal;
