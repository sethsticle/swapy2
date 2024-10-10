"use client"

import { useEffect } from 'react';
import { createSwapy } from 'swapy';
import Item from '../components/Item';

const DEFAULT = {
  '1': 'a',
  '2': 'b',
  '3': 'c',
  '4': 'd'
};

const itemsConfig = [
  { id: 'a', color: 'bg-red-600', label: 'A' },
  { id: 'b', color: 'bg-gray-600', label: 'B' },
  { id: 'c', color: 'bg-blue-600', label: 'C' },
  { id: 'd', color: 'bg-pink-600', label: 'D' }
];

const ItemComponents = itemsConfig.reduce((components, { id, color, label }) => {
  components[id] = () => (
    <Item id={id} color={color} label={label} />
  );
  return components;
}, {} as Record<string, () => JSX.Element>);

function App() {
  const slotItems: Record<string, 'a' | 'b' | 'c' | 'd' | null> = localStorage.getItem('slotItem')
    ? JSON.parse(localStorage.getItem('slotItem')!)
    : DEFAULT;

  useEffect(() => {
    const container = document.querySelector('.container')!;
    const swapy = createSwapy(container);
    swapy.onSwap(({ data }) => {
      localStorage.setItem('slotItem', JSON.stringify(data.object));
    });
  }, []);

  return (
    <div className='h-screen flex items-center justify-center w-full bg-gray-900'>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 p-4 md:w-[50%] container">
        {/* Mobile layout: col-span-2 and col-span-1 adjust for 3 rows */}
        <div className="bg-gray-800 col-span-2 lg:col-span-3 h-[150px] rounded-[20px]" data-swapy-slot="1">
          {ItemComponents[slotItems['1']] ? ItemComponents[slotItems['1']]() : null}
        </div>
        <div className="bg-gray-800 col-span-2 lg:col-span-1 h-[150px] rounded-[20px]" data-swapy-slot="2">
          {ItemComponents[slotItems['2']] ? ItemComponents[slotItems['2']]() : null}
        </div>

        {/* Mobile layout: single item per row */}
        <div className="bg-gray-800 col-span-4 lg:col-span-1 h-[150px] rounded-[20px]" data-swapy-slot="3">
          {ItemComponents[slotItems['3']] ? ItemComponents[slotItems['3']]() : null}
        </div>
        <div className="bg-gray-800 col-span-4 lg:col-span-3 h-[150px] rounded-[20px]" data-swapy-slot="4">
          {ItemComponents[slotItems['4']] ? ItemComponents[slotItems['4']]() : null}
        </div>
      </div>
    </div>
  );
}

export default App;