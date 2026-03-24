import Image from 'next/image'
import Header from './Header'
export default function Page() {
  return (
    <div>
      <Header/>
      <Image src="/profile.png" alt="Profile" width={100} height={100} />
    </div>
  )
}