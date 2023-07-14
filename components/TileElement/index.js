import './styles.css'
import Image from 'next/image'
import barbell from '../../public/barbell.jpg'
import lifting from '../../public/lifting.jpg'
import dumbbells from '../../public/dumbells.jpg'
import gym from '../../public/gym.jpg'

export default function TileElement(){
    return (
        <section className='container__tiles'>
            <Image
            src={barbell}
            fill
            alt='Image of a barbell with weight on the floor'
            sizes='(max-width: 375px) 30vw'
            className='tile__image barbell'
            />
           <Image
            src={lifting}
            fill
            alt='Person with pony tail lifting barbell behind the head'
            sizes='(max-width: 375px) 30vw'
            className='tile__image lifting'
            />
            <Image
            src={dumbbells}
            fill
            alt='Person with pony tail lifting barbell behind the head'
            sizes='(max-width: 375px) 30vw'
            className='tile__image dumbbells'
            />
            <Image
            src={gym}
            fill
            alt='Person with pony tail lifting barbell behind the head'
            sizes='(max-width: 375px) 30vw'
            className='tile__image gym'
            />
        </section>
    )
}