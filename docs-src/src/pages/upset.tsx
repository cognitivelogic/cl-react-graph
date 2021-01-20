// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

import React, { FC } from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import UpsetChart, { TUpsetData } from '../../../src/UpsetChart';
import Layout from '../components/layout';
import SEO from '../components/seo';

const data: TUpsetData = [
  { keys: ['Email'], value: 10 },
  { keys: ['Email', 'MAID'], value: 14 },
  { keys: ['Email', 'MAID', 'Postcode'], value: 1 },
  { keys: ['MAID'], value: 10 },
  { keys: ['Email', 'Postcode'], value: 14 },
  { keys: ['Postcode'], value: 12 },
];

const UpsetExample: FC = () => {
  return (
    <Layout>
      <SEO title="Upset Chart" description="" />
      <Typography variant="h2">Upset</Typography>
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <UpsetChart
                  title="example upset chart"
                  description="more info for accessibility"
                  width={600}
                  height={400}
                  distribution={{
                    colorScheme: ['rgb(154, 187, 218)'],
                    fill: {
                      active: 'rgb(154, 187, 218)',
                      inactive: '#ddd',
                    },
                  }}
                  setSize={{
                    dimensions: { chartWidth: 100, axisWidth: 120, height: 150 },
                    colorScheme: ['rgb(154, 218, 172)'],
                  }}
                  data={data} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default UpsetExample;
