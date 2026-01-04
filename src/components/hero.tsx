'use client'

import * as React from 'react'
import dynamic from 'next/dynamic';
import { Installer } from '@/components/installer';


export function Hero() {


  return (
    <div className={"flex flex-col md:min-h-[90vh] py-10 md:py-0 items-center justify-center"}>
    <section className="relative sm:grid sm:grid-cols-12 sm:divide-x">
      <div className="relative   col-span-12 space-y-4 overflow-hidden px-4  text-center sm:px-8  ">
        <h1
          className=" relative mx-auto w-fit font-semibold text-5xl leading-tight tracking-tighter md:text-6xl lg:text-7xl 2xl:text-8xl">
          brinicle
        </h1>
        <p className=" mx-auto max-w-2xl text-balance text-lg text-muted-foreground md:text-2xl">
          brinicle is a C++ vector index engine (ANN library) optimized for disk-first, low-RAM similarity search.
        </p>
        <div className=" mx-auto flex w-fit flex-col items-center gap-8 pt-4">
          <Installer/>
        </div>
      </div>
    </section>
    </div>
  )
}
