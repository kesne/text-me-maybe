import React from 'react';
import Layout from '@airbnb/lunar-layouts/lib/components/Layout';
import Grid from '@airbnb/lunar/lib/components/Grid';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import Title from '@airbnb/lunar/lib/components/Title';
import Button from '@airbnb/lunar/lib/components/Button';
import IconLock from '@airbnb/lunar-icons/lib/interface/IconLock';
import IconBolt from '@airbnb/lunar-icons/lib/general/IconBolt';
import IconVerifiedUser from '@airbnb/lunar-icons/lib/general/IconVerifiedUser';
import ValueProp from './ValueProp';

export default function Home() {
    return (
        <Layout centerAlign>
            <Title level={1}>Never reveal your phone number again</Title>
            <Title level={3}>
                Send text messages to anyone without revealing your phone number, starting at just
                $5 per month.
            </Title>
            <Spacing vertical={4}>
                <Button large href="/signup">
                    Get Started
                </Button>
            </Spacing>
            <Grid>
                <ValueProp
                    Icon={IconLock}
                    header="Private"
                    description="Messages come from a completely unique phone number."
                />
                <ValueProp
                    Icon={IconBolt}
                    header="In Control"
                    description="Stop anyone from messaging you instantly by ending a conversation."
                />
                <ValueProp
                    Icon={IconVerifiedUser}
                    header="Fast"
                    description="You can start conversations in seconds, without any setup."
                />
            </Grid>
        </Layout>
    );
}
