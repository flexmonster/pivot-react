"use client"
import React from "react";
import { usePathname } from 'next/navigation'


export default function Link({
    url, caption
  }: {
    url: string, caption: string
  }){
    const path = usePathname();

    return (
        <a className={path === url ? "router-link-exact-active": ""} href={url}>{caption}</a>
    )
}