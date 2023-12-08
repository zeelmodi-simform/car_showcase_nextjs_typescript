
import ServerSideRender from '@/components/ServerSideRender';
import {  PageProps } from '@/types';
import Image from 'next/image'


export default async function Home(
  { searchParams }: Readonly<PageProps>) {

  
  return <ServerSideRender searchParams={searchParams} />
};
