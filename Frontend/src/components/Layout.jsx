
export default function Layout({sidebar, header, page}) {
    return (
        <main className='p-4 relative h-screen flex flex-row gap-4 bg-base-300'>
            {sidebar}
            <section className='flex flex-col flex-1 gap-y-4'>            
                {header}
                <section className='bg-base-100 shadow-sm h-full rounded-md'>
                    {page}
                </section>
            </section>
        </main> 
    )
}