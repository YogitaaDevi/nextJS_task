'use client'
import React from 'react'
import Button from '../button/Button'
import "./style.css";
import { useRouter, useSearchParams } from 'next/navigation';

interface RegionCardProps{
  item: string
}
const RegionCard = ({item}: RegionCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleFilterChange = (filter: string, event?: any) => {
    const isChecked = event?.target.checked;
    if (isChecked) currentParams.set(filter, "true");
    else currentParams.delete(filter);
    router.push(`?${currentParams.toString()}`);
  };
    const handleClick = () => {

    }
  return (
    <div className='flex region__filter'>
      <Button className="region__filter__name" onClick={handleClick} name={item}/>
    </div>
  )
}

export default RegionCard
