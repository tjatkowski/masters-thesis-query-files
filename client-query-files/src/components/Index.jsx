import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import Documents from "./Index/Documents"

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ pt: 2 }}>
        {children}
      </Box>
    )}
  </div>
);

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Index = ({index}) => {
  const [tab, setTab] = useState(0)

  if (!index) return <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: 'grey.600'
  }}>Select an index</Box>;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(_, tab) => setTab(tab)} aria-label="basic tabs example">
            <Tab label="Query" {...a11yProps(0)} />
            <Tab label="Documents" {...a11yProps(1)} />
            <Tab label="Settings" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          Query
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Documents index={index} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          Settings
        </TabPanel>
      </Box>
    </>
  );
};

export default Index;