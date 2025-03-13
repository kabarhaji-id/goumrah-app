import {Container} from "@/shared/ui/layout/components/container";
import {PageWrapper} from "@/shared/ui/layout/page-wrapper";
import ForgetView from "@/sections/auth/pages/forget";

const ForgetPage = () => {
    return (

        <PageWrapper>
            <Container className=" h-full text-center text-2xl">
                <ForgetView />
            </Container>
        </PageWrapper>
    );
};

export default ForgetPage;
