import AppLayout from "./components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalCard from "./components/ProposalCard";
import useChairPerson from "./hooks/useChairPerson";
import useProposals from "./hooks/useProposals";

function App() {
    const chairPerson = useChairPerson();

    const { proposals, proposalQuorum, voteOnProposal, executeProposal } =
        useProposals();

    console.log("proposals: ", proposals);

    const activePropsals = proposals.filter((proposal) => !proposal.executed);

    const inActiveProposals = proposals.filter((proposal) => proposal.executed);

    return (
        <AppLayout chairPersonAddress={chairPerson}>
            <div className="flex w-full flex-col gap-6">
                <Tabs defaultValue="active" className="mt-4">
                    <TabsList>
                        <TabsTrigger value="active" className="cursor-pointer">
                            Active
                        </TabsTrigger>
                        <TabsTrigger
                            value="inactive"
                            className="cursor-pointer"
                        >
                            InActive
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="active">
                        {activePropsals.length === 0 ? (
                            <span>No active proposals</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                                {activePropsals.map((p) => (
                                    <ProposalCard
                                        key={p.id}
                                        {...p}
                                        quorum={proposalQuorum}
                                        handleVote={voteOnProposal}
                                        handleExecute={executeProposal}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="inactive">
                        {inActiveProposals.length === 0 ? (
                            <span>No inactive proposals</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto">
                                {inActiveProposals.map((p) => (
                                    <ProposalCard
                                        key={p.id}
                                        {...p}
                                        quorum={proposalQuorum}
                                        handleVote={voteOnProposal}
                                        handleExecute={executeProposal}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}

export default App;
