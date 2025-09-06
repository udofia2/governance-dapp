import AppLayout from "./components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalCard from "./components/ProposalCard";
import useChairPerson from "./hooks/useChairPerson";

const proposals = [
    {
        id: 1,
        description: "Fund community outreach program",
        recipient: "0x1234567890123456789012345678901234567890",
        amount: "1000000000000000000",
        voteCount: 12,
        deadline: 1703980800,
        executed: false,
        isVoted: false,
    },
    {
        id: 2,
        description: "Develop new smart contract features",
        recipient: "0x2345678901234567890123456789012345678901",
        amount: "2000000000000000000",
        voteCount: 8,
        deadline: 1704067200,
        executed: true,
        isVoted: true,
    },
    {
        id: 3,
        description: "Marketing campaign funding",
        recipient: "0x3456789012345678901234567890123456789012",
        amount: "1500000000000000000",
        voteCount: 15,
        deadline: 1704153600,
        executed: false,
        isVoted: false,
    },
    {
        id: 4,
        description: "Security audit funding",
        recipient: "0x4567890123456789012345678901234567890123",
        amount: "3000000000000000000",
        voteCount: 20,
        deadline: 1704240000,
        executed: false,
        isVoted: true,
    },
    {
        id: 5,
        description: "Infrastructure upgrade",
        recipient: "0x5678901234567890123456789012345678901234",
        amount: "2500000000000000000",
        voteCount: 18,
        deadline: 1704326400,
        executed: true,
        isVoted: true,
    },
    {
        id: 6,
        description: "Developer grants program",
        recipient: "0x6789012345678901234567890123456789012345",
        amount: "1800000000000000000",
        voteCount: 25,
        deadline: 1704412800,
        executed: false,
        isVoted: false,
    },
    {
        id: 7,
        description: "Community event sponsorship",
        recipient: "0x7890123456789012345678901234567890123456",
        amount: "1200000000000000000",
        voteCount: 10,
        deadline: 1704499200,
        executed: false,
        isVoted: false,
    },
    {
        id: 8,
        description: "Protocol research funding",
        recipient: "0x8901234567890123456789012345678901234567",
        amount: "2200000000000000000",
        voteCount: 16,
        deadline: 1704585600,
        executed: true,
        isVoted: true,
    },
    {
        id: 9,
        description: "DAO treasury diversification",
        recipient: "0x9012345678901234567890123456789012345678",
        amount: "4000000000000000000",
        voteCount: 30,
        deadline: 1704672000,
        executed: false,
        isVoted: true,
    },
    {
        id: 10,
        description: "Technical documentation update",
        recipient: "0x0123456789012345678901234567890123456789",
        amount: "1600000000000000000",
        voteCount: 14,
        deadline: 1704758400,
        executed: false,
        isVoted: false,
    },
];

function App() {
    const chairPerson = useChairPerson();

    const activePropsals = proposals.filter(
        (proposal) =>
            !proposal.executed || proposal.deadline * 1000 > Date.now()
    );
    const inActiveProposals = proposals.filter(
        (proposal) => proposal.executed || proposal.deadline * 1000 < Date.now()
    );
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
                                        handleVote={() => {}}
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
                                        handleVote={() => {}}
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
