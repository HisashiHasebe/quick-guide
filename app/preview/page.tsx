'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = searchParams.get('preview_token')
    const fetchData = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/content/preview?preview_token=' + token).then((res) => res.json());
        setData(res);
    };
    fetchData();
  }, [searchParams]); 
  
  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.details.subject}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.details.contents }} />
    </div>
  );
}