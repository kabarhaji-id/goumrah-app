import React from "react";
import {PageWrapper} from "@/shared/ui/layout/page-wrapper";
import RegisterView from "@/sections/auth/pages/register";
import {Container} from "@/shared/ui/layout/components/container";


const RegisterPage = () => {

    return (

        <PageWrapper>
            <Container className=" h-full text-center text-2xl">
                <RegisterView />
            </Container>
        </PageWrapper>
    )


};

export default RegisterPage;