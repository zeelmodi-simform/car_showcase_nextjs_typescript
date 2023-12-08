
import ClientSideRender from '@/components/ClientSideRender';
import ServerSideRender from '@/components/ServerSideRender';
import {  PageProps } from '@/types';
import Image from 'next/image'


export default async function Home(
  { searchParams }: Readonly<PageProps>) {

  return (
    <ClientSideRender />
  )
  // return <ServerSideRender searchParams={searchParams} />
};
