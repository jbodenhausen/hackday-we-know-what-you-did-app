import React, { useState, useEffect } from 'react';
import {
    Workbench,
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    Tag,
    Asset, 
    Paragraph,
    TabPanel,
    Tabs,
    Tab,
    HelpText
} from '@contentful/forma-36-react-components';
import '@contentful/forma-36-fcss/dist/styles.css'
import { PageExtensionSDK } from 'contentful-ui-extensions-sdk';
import Entry from './EntryEditor';
import { Interface } from 'readline';

interface Entry {
    sys: {
        id: string;
        publishedAt: string;
        updatedAt: string;
        createdAt: string;
    };
    fields: {
        body: {
            'en-US': string;
        };
        title: {
            'en-US': string;
        };
    };
}

interface ReadyTagProps {
    onClick(): void;
    errorCount: number;
}

interface ContentType{
    sys:{
        id: string;
    }
    name: string;
}

interface PageProps {
    sdk: PageExtensionSDK;
}

// const ReadyTag = ({ onClick, errorCount = 0 }: ReadyTagProps) => (
//     <div onClick={onClick} style={{ cursor: 'pointer' }}>
//         <Tag tagType={errorCount > 0 ? 'negative' : 'positive'}>
//             {errorCount} {errorCount === 1 ? 'error' : 'errors'}
//         </Tag>
//     </div>
// );

const Page = ({ sdk }: PageProps) => {
    const [types, setTypes] = useState<ContentType[]>([]);

    useEffect(() => {
        sdk.space.getContentTypes<ContentType>().then((data) => {
            setTypes(data.items);
        });
    });


    const [selected, setSelected] = useState('first');

    return (
        <Workbench>
            <Workbench.Header title="Creator Productivity" />
            <Workbench.Content>
            <Tabs withDivider>
                <Tab
                id="first"
                selected={selected === 'first'}
                onSelect={(id: string) => {
                    setSelected(id);
                }}
                >
                General
                </Tab>
                <Tab
                id="second"
                selected={selected === 'second'}
                onSelect={(id: string) => {
                    setSelected(id);
                }}
                >
                Release Estimates
                </Tab>
                <Tab
                id="third"
                selected={selected === 'third'}
                onSelect={(id: string) => {
                    setSelected(id);
                }}
                >
                Savings
                </Tab>
                <Tab
                id="fourth"
                selected={selected === 'fourth'}
                onSelect={(id: string) => {
                    setSelected(id);
                }}
                >
                Effort Areas
                </Tab>
                <Tab
                id="fifth"
                selected={selected === 'fifth'}
                onSelect={(id: string) => {
                    setSelected(id);
                }}
                >
                Understand Your Spaces
                </Tab>
                <Tab
                id="sixth"
                disabled
                selected={selected === 'sixth'}
                onSelect={(id: string) => {
                    setSelected(id);
                }}
                >
                Boring Compliance Logs (Only Admins Care)
                </Tab>
            </Tabs>
            {selected === 'first' && (
                <TabPanel id="first">{mvpStatsTab(types)}</TabPanel>
            )}
            {selected === 'second' && (
                <TabPanel id="second">{releaseEstimatesTab()}</TabPanel>
            )}
            {selected === 'third' && (
                <TabPanel id="third">{savingsTab()}</TabPanel>
            )}
            {selected === 'fourth' && (
                <TabPanel id="fourth">{effortByWorkClassification()}</TabPanel>
            )}
            {selected === 'fifth' && (
                <TabPanel id="fifth">{miroDiagramTab()}</TabPanel>
            )}
            {selected === 'sixth' && (
                <TabPanel id="sixth">{miroDiagramTab()}</TabPanel>
            )}
        </Workbench.Content>
        </Workbench>
    );
};

function mvpStatsTab(types:ContentType[])
{
    //Hardcoded data for testing
    // const ctStats = [
    //     { "index":"0", "type":"📜-Page", "clicks":"150", "avgTime":"75" },
    //     { "index":"1", "type":"📜-Post", "clicks":"90", "avgTime":"215"},
    //     { "index":"2", "type":"📜-Category", "clicks":"50", "avgTime":"18" },
    //     { "index":"3", "type":"#️⃣-topic-Product", "clicks":"45", "avgTime":"90" },
    //     { "index":"4", "type":"#️⃣-topic-Person", "clicks":"20", "avgTime":"15"},
    //     { "index":"5", "type":"#️⃣-topic-Business-info", "clicks":"20", "avgTime":"48" }
    //   ];

    return (
    <div style={{marginTop: "3rem"}}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Type Name</TableCell>
                    <TableCell align="center">Views</TableCell>
                    <TableCell align="center">Average Time (minutes)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { types.map((type, index) => (
                    <TableRow key={type.sys.id}>
                        <TableCell>
                            {type.name}
                        </TableCell>
                        <TableCell align="center">
                            {(150-parseInt(""+index*5))}
                        </TableCell>
                        <TableCell align="center">
                            {(200-parseInt(""+index*10))}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody> 
        </Table>
        
        <HelpText style={{marginTop: "1rem"}}>This table will show you the amount of interactions your team has with different types of content as well as the average amount of time spent working on them. You can use these insights to identify places you might be able to further optimize workflows.</HelpText>
    </div>);
}

function releaseEstimatesTab(){
    return(
        <div style={{marginTop: "3rem"}}>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Release</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Release Date</TableCell>
                    <TableCell>Time Spent (minutes)</TableCell>
                    <TableCell>Estimated Time Remaning (minutes)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell>Halloween Campaign</TableCell>
                    <TableCell>2020-10-07</TableCell>
                    <TableCell>2020-11-07</TableCell>
                    <TableCell>115</TableCell>
                    <TableCell>75</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Costumes Landing Page</TableCell>
                    <TableCell>2020-09-10</TableCell>
                    <TableCell>2020-12-01</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>30</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Candy Corn Product Page</TableCell>
                    <TableCell>2020-10-10</TableCell>
                    <TableCell>2020-12-03</TableCell>
                    <TableCell>125</TableCell>
                    <TableCell>40</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Transylvania Market Rollout</TableCell>
                    <TableCell>2020-08-10</TableCell>
                    <TableCell>2020-12-10</TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>120</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

function savingsTab(){
    return(
        <div style={{marginTop: "3rem"}}>
            <Paragraph>
                    <Asset src="https://images.ctfassets.net/17wsgyyhj5gs/1mxF8YP2vpx4KnZ1Yw8qYu/e380e5ea06018dfe448a0d26d084dbd5/image__1_.png" />
            </Paragraph>
            <HelpText style={{marginTop: "1rem", textAlign:"center"}}>This data will help you understand how content reuse is saving you time and money.</HelpText>
        </div>
    )
}

function effortByWorkClassification(){
    return(
        <div style={{marginTop: "3rem"}}>
            <Paragraph>
                    <Asset src="https://images.ctfassets.net/17wsgyyhj5gs/6tNLJoniT9YbNM2OeWzGoP/192e40ad906b4b72179237f5a3257e7e/image.png" />
            </Paragraph>
            <HelpText style={{marginTop: "1rem", textAlign:"center"}}>This data will help you understand the main areas where your content teams are spending efforts.</HelpText>
        </div>
    )
}

function miroDiagramTab(){
    return(
        <div>
            <iframe width="1280" height="720" src="https://miro.com/app/live-embed/o9J_kgn8IaU=/?moveToViewport=2976,175,1718,990" frameBorder="0" scrolling="no" allowFullScreen></iframe>
        </div>
    )
}

export default Page;
