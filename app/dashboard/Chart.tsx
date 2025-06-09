'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AppEmoji } from '../components/EmojiWrapper';

interface ChartProps {
  data: {
    date: string;
    rating: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='p-3 bg-white rounded-lg border border-gray-200 shadow-lg'>
        <p className='text-sm font-semibold text-gray-800 mb-1'>{label}</p>
        <div className='flex items-center'>
          <AppEmoji name='star' width={16} />
          <p className='ml-2 text-sm text-gray-600'>
            Rating:{' '}
            <span className='font-bold text-purple-600'>
              {payload[0].value}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='colorRating' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#8b5cf6' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#8b5cf6' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey='date'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        <Area
          type='monotone'
          dataKey='rating'
          stroke='#8b5cf6'
          fillOpacity={1}
          fill='url(#colorRating)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
