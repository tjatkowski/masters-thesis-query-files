import {Slider, Box, Button} from "@mui/material";
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import React, {useEffect, useState} from "react";
import Url from "../../utility/Url";

const Settings = ({index}) => {
  const [temperature, setTemperature] = useState(null);
  const [topk, setTopk] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(Url.settings(index));
        if (!response.ok)
          throw new Error('Something went wrong!');
        const data = await response.json();
        setTemperature(data.settings.temperature);
        setTopk(data.settings.topk);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [index])

  const save = async () => {
    const response = await fetch(Url.settings(index), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({settings: {temperature, topk}})
    });

    if(response.ok)
      console.log('Settings saved!')
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 1,
      alignItems: 'center'
    }}>
      <ThermostatIcon fontSize="large"/>
      <Box sx={{p: 2}}>
        Temperature
        <Slider
          aria-label="Restricted values"
          value={temperature}
          onChange={(_, value) => setTemperature(value)}
          min={0.0}
          max={1.0}
          step={0.05}
          valueLabelDisplay="auto"
        />
        {temperature}
      </Box>
      <StackedBarChartIcon fontSize="large"/>
      <Box sx={{p: 2}}>
        Top-k
        <Slider
          aria-label="Restricted values"
          value={topk}
          onChange={(_, value) => setTopk(value)}
          min={1}
          max={25}
          step={1}
          valueLabelDisplay="auto"
        />
        {topk}
      </Box>

      <Button variant="outlined" sx={{gridColumn: 'span 2'}} onClick={save}>
        Save
      </Button>
    </Box>
  )
}

export default Settings
