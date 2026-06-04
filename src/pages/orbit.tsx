import InfiniteMenu from '@/components/InfiniteMenu'

const items = [
  { image: '/images_for_website/AdobeStock_138352374.jpeg', link: '#', title: 'Gallery Image 1', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_217671664.jpeg', link: '#', title: 'Gallery Image 2', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_282057778.jpeg', link: '#', title: 'Gallery Image 3', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_283043495.jpeg', link: '#', title: 'Gallery Image 4', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_316650449.jpeg', link: '#', title: 'Gallery Image 5', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_324447961.jpeg', link: '#', title: 'Gallery Image 6', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_354654196.jpeg', link: '#', title: 'Gallery Image 7', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_400908762.jpeg', link: '#', title: 'Gallery Image 8', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_428773540.jpeg', link: '#', title: 'Gallery Image 9', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_473092747.jpeg', link: '#', title: 'Gallery Image 10', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_542313660.jpeg', link: '#', title: 'Gallery Image 11', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/AdobeStock_553083537.jpeg', link: '#', title: 'Gallery Image 12', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/Bustling Port Scene.png', link: '#', title: 'Port Scene', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/andy-li-CpsTAUPoScw-unsplash.jpg', link: '#', title: 'Gallery Image 14', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/arisa-chattasa-0LaBRkmH4fM-unsplash.jpg', link: '#', title: 'Gallery Image 15', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/arvind-vallabh-rqWWhKzVCaU-unsplash.jpg', link: '#', title: 'Gallery Image 16', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/carlos-muza-hpjSkU2UYSU-unsplash.jpg', link: '#', title: 'Gallery Image 17', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/chuttersnap-9cCeS9Sg6nU-unsplash.jpg', link: '#', title: 'Gallery Image 18', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/frank-mckenna-tjX_sniNzgQ-unsplash.jpg', link: '#', title: 'Gallery Image 19', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/ibrahim-rifath-OApHds2yEGQ-unsplash.jpg', link: '#', title: 'Gallery Image 20', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/micheile-henderson-ZVprbBmT8QA-unsplash.jpg', link: '#', title: 'Gallery Image 21', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/pexels-cottonbro-7319085.jpg', link: '#', title: 'Gallery Image 22', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/pexels-mikhail-nilov-8297016.jpg', link: '#', title: 'Gallery Image 23', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/pexels-pixabay-53621.jpg', link: '#', title: 'Gallery Image 24', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/pexels-rdne-7821689.jpg', link: '#', title: 'Gallery Image 25', description: 'Explore our latest document workflow capabilities.' },
  { image: '/images_for_website/pexels-yankrukov-7691751.jpg', link: '#', title: 'Gallery Image 26', description: 'Explore our latest document workflow capabilities.' }
];

export default function Orbit(){
    return(
    <div style={{ height: '100vh', position: 'relative', backgroundColor: 'black' }}>
        <InfiniteMenu items={items} scale={1} />
    </div>
    )
}