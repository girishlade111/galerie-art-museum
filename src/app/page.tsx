'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, X, ChevronLeft, ChevronRight, ZoomIn, 
  Palette, Building2, BookOpen, Users, ArrowRight,
  Eye, CircleDot, Minus, Maximize2, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Types
interface Artist {
  id: string
  name: string
  bio: string
  birthYear: number
  deathYear: number | null
  nationality: string
  imageUrl: string
}

interface ArtMovement {
  id: string
  name: string
  description: string
  period: string
  imageUrl: string
  _count?: { artworks: number }
}

interface Artwork {
  id: string
  title: string
  description: string
  year: number
  medium: string
  dimensions: string
  imageUrl: string
  featured: boolean
  artistId: string
  movementId: string
  artist: Artist
  movement: ArtMovement
}

// ==================== HERO CAROUSEL ====================
function HeroCarousel({ artworks }: { artworks: Artwork[] }) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    if (isTransitioning || artworks.length === 0) return
    setIsTransitioning(true)
    setCurrent((prev) => (prev + 1) % artworks.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [artworks.length, isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning || artworks.length === 0) return
    setIsTransitioning(true)
    setCurrent((prev) => (prev - 1 + artworks.length) % artworks.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [artworks.length, isTransitioning])

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  if (artworks.length === 0) return null

  const artwork = artworks[current]

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-dark-gray">
      {/* Background images with crossfade */}
      {artworks.map((art, index) => (
        <div
          key={art.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          <img
            src={art.imageUrl}
            alt={art.title}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Badge
                variant="outline"
                className="mb-4 border-gold/50 bg-black/30 text-gold-light backdrop-blur-sm"
              >
                {artwork.movement.name} · {artwork.year}
              </Badge>
              <h1 className="font-serif text-4xl font-bold tracking-wide text-white md:text-6xl lg:text-7xl text-shadow-elegant">
                {artwork.title}
              </h1>
              <p className="mt-3 font-serif text-xl italic text-gold-light md:text-2xl text-shadow-elegant">
                {artwork.artist.name}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
                {artwork.description.slice(0, 180)}...
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="mt-8 flex items-center gap-6">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gold/40 bg-black/20 text-white backdrop-blur-sm hover:border-gold hover:bg-black/40"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gold/40 bg-black/20 text-white backdrop-blur-sm hover:border-gold hover:bg-black/40"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="ml-4 flex items-center gap-2">
              {artworks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrent(index) }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === current
                      ? 'w-8 bg-gold'
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gold line */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
    </section>
  )
}

// ==================== MOVEMENT SECTION ====================
function MovementSection({ 
  movements, 
  onSelect 
}: { 
  movements: ArtMovement[]
  onSelect: (movement: ArtMovement) => void 
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const movementIcons: Record<string, React.ReactNode> = {
    'Renaissance': <Palette className="h-6 w-6" />,
    'Baroque': <Building2 className="h-6 w-6" />,
    'Impressionism': <Eye className="h-6 w-6" />,
    'Post-Impressionism': <Sparkles className="h-6 w-6" />,
    'Modernism': <CircleDot className="h-6 w-6" />,
    'Surrealism': <BookOpen className="h-6 w-6" />,
  }

  return (
    <section className="py-20 px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="ornament-divider mb-6">
            <span className="text-gold text-2xl">✦</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-wide text-dark-gray md:text-4xl">
            Art Movements
          </h2>
          <p className="mt-3 text-muted-foreground">
            Journey through centuries of artistic evolution
          </p>
        </div>

        {/* Movement Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movements.map((movement, index) => (
            <motion.div
              key={movement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(movement.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelect(movement)}
            >
              <div className="relative overflow-hidden rounded-lg">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={movement.imageUrl}
                    alt={movement.name}
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      hoveredId === movement.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 ${
                  hoveredId === movement.id ? 'opacity-100' : 'opacity-80'
                }`} />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="mb-2 flex items-center gap-2 text-gold-light">
                    {movementIcons[movement.name] || <Palette className="h-5 w-5" />}
                    <span className="text-xs font-medium uppercase tracking-widest">
                      {movement.period}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white md:text-2xl">
                    {movement.name}
                  </h3>
                  <p className={`mt-1 text-sm text-white/70 transition-all duration-500 ${
                    hoveredId === movement.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    {movement.description.slice(0, 100)}...
                  </p>
                  <div className={`mt-3 flex items-center gap-1 text-gold-light transition-all duration-500 ${
                    hoveredId === movement.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}>
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Gold corner accents */}
                <div className={`absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-gold/0 transition-all duration-500 ${
                  hoveredId === movement.id ? '!border-gold/70' : ''
                }`} />
                <div className={`absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-gold/0 transition-all duration-500 ${
                  hoveredId === movement.id ? '!border-gold/70' : ''
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== ARTWORK CARD ====================
function ArtworkCard({ 
  artwork, 
  onSelect 
}: { 
  artwork: Artwork
  onSelect: (artwork: Artwork) => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => onSelect(artwork)}
    >
      <div className="overflow-hidden rounded-md bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
        {/* Image with gold frame */}
        <div className="relative p-3">
          <div className="gold-frame-thin overflow-hidden">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          {/* Zoom icon */}
          <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" />
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pb-4">
          <h3 className="font-serif text-base font-semibold text-dark-gray line-clamp-1">
            {artwork.title}
          </h3>
          <p className="mt-1 font-serif text-sm italic text-gold-dark">
            {artwork.artist.name}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-normal">
              {artwork.movement.name}
            </Badge>
            <span className="text-xs text-muted-foreground">{artwork.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ==================== ARTWORK DETAIL MODAL ====================
function ArtworkDetail({ 
  artwork, 
  onClose 
}: { 
  artwork: Artwork
  onClose: () => void 
}) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }, [isZoomed])

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Image Side */}
          <div className="relative md:w-3/5 bg-gallery-gray flex items-center justify-center p-6 min-h-[300px]">
            <div
              ref={imageRef}
              className={`relative gold-frame overflow-hidden cursor-zoom-in ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="max-h-[60vh] w-auto object-contain transition-transform duration-300"
                style={isZoomed ? {
                  transform: 'scale(2.5)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                } : {}}
              />
            </div>
            {/* Zoom hint */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
              <ZoomIn className="h-3.5 w-3.5" />
              <span>Click to zoom · Move to explore</span>
            </div>
          </div>

          {/* Details Side */}
          <div className="md:w-2/5 overflow-y-auto custom-scrollbar">
            <ScrollArea className="h-full">
              <div className="p-6 md:p-8">
                {/* Close button */}
                <div className="mb-6 flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Title & Artist */}
                <h2 className="font-serif text-2xl font-bold text-dark-gray md:text-3xl">
                  {artwork.title}
                </h2>
                <p className="mt-2 font-serif text-lg italic text-gold-dark">
                  {artwork.artist.name}
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-gold/50 via-gold/20 to-transparent" />

                {/* Details */}
                <div className="space-y-4">
                  <DetailRow label="Year" value={String(artwork.year)} />
                  <DetailRow label="Medium" value={artwork.medium} />
                  <DetailRow label="Dimensions" value={artwork.dimensions} />
                  <DetailRow label="Movement" value={artwork.movement.name} />
                  <DetailRow label="Nationality" value={artwork.artist.nationality} />
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-gold/50 via-gold/20 to-transparent" />

                {/* Description */}
                <h3 className="mb-2 font-serif text-sm font-semibold uppercase tracking-wider text-gold-dark">
                  About This Work
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {artwork.description}
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-gold/50 via-gold/20 to-transparent" />

                {/* Artist Bio */}
                <h3 className="mb-2 font-serif text-sm font-semibold uppercase tracking-wider text-gold-dark">
                  About the Artist
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {artwork.artist.bio}
                </p>

                {/* Movement info */}
                <div className="mt-6 rounded-lg border border-gold/20 bg-gallery-white p-4">
                  <div className="flex items-center gap-2 text-gold-dark">
                    <Palette className="h-4 w-4" />
                    <span className="font-serif text-sm font-semibold">{artwork.movement.name}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {artwork.movement.description.slice(0, 150)}...
                  </p>
                  <Badge variant="outline" className="mt-2 border-gold/30 text-xs">
                    {artwork.movement.period}
                  </Badge>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-dark-gray">{value}</span>
    </div>
  )
}

// ==================== VIRTUAL 3D EXHIBITION ====================
function VirtualExhibition({ artworks }: { artworks: Artwork[] }) {
  const [currentPanel, setCurrentPanel] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const totalPanels = Math.min(artworks.length, 12)
  const anglePerPanel = 360 / totalPanels
  const radius = 450

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % totalPanels)
    }, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, totalPanels])

  const rotateTo = (index: number) => {
    setCurrentPanel(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative overflow-hidden bg-dark-gray py-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/virtual-exhibition.png"
          alt="Virtual Exhibition"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/80 via-dark-gray/50 to-dark-gray/90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="ornament-divider mb-6">
            <span className="text-gold text-2xl">✦</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-wide text-white md:text-4xl">
            Virtual Exhibition Hall
          </h2>
          <p className="mt-3 text-white/60">
            Step into our 3D museum and experience art in an immersive space
          </p>
        </div>

        {/* 3D Gallery */}
        <div className="flex flex-col items-center">
          {/* 3D Carousel */}
          <div className="gallery-3d relative mx-auto h-[420px] w-full max-w-4xl">
            <div
              className="gallery-carousel absolute left-1/2 top-1/2 h-64 w-52 -translate-x-1/2 -translate-y-1/2 md:h-72 md:w-60"
              style={{
                transform: `translateX(-50%) translateY(-50%) rotateY(${-currentPanel * anglePerPanel}deg)`,
              }}
            >
              {artworks.slice(0, totalPanels).map((artwork, index) => {
                const angle = index * anglePerPanel
                return (
                  <div
                    key={artwork.id}
                    className="gallery-panel h-64 w-52 -translate-x-1/2 -translate-y-1/2 cursor-pointer md:h-72 md:w-60"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    }}
                    onClick={() => rotateTo(index)}
                  >
                    <div className={`gold-frame overflow-hidden transition-all duration-500 ${
                      index === currentPanel ? 'ring-2 ring-gold/60' : 'opacity-70 hover:opacity-100'
                    }`}>
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className={`mt-2 text-center transition-opacity duration-500 ${
                      index === currentPanel ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <p className="font-serif text-sm font-medium text-white line-clamp-1">
                        {artwork.title}
                      </p>
                      <p className="text-xs italic text-gold-light">
                        {artwork.artist.name}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Floor reflection */}
            <div className="absolute bottom-0 left-1/2 h-16 w-96 -translate-x-1/2 rounded-b-full bg-gradient-to-t from-gold/5 to-transparent blur-xl" />
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-gold/30 bg-transparent text-white hover:border-gold hover:bg-white/10"
              onClick={() => rotateTo((currentPanel - 1 + totalPanels) % totalPanels)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1.5">
              {artworks.slice(0, totalPanels).map((_, index) => (
                <button
                  key={index}
                  onClick={() => rotateTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentPanel
                      ? 'w-6 bg-gold'
                      : 'w-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-gold/30 bg-transparent text-white hover:border-gold hover:bg-white/10"
              onClick={() => rotateTo((currentPanel + 1) % totalPanels)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Current artwork info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPanel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 text-center"
            >
              <h3 className="font-serif text-xl font-bold text-white">
                {artworks[currentPanel]?.title}
              </h3>
              <p className="mt-1 font-serif text-base italic text-gold-light">
                {artworks[currentPanel]?.artist.name}, {artworks[currentPanel]?.year}
              </p>
              <p className="mt-2 max-w-md text-sm text-white/50">
                {artworks[currentPanel]?.description.slice(0, 120)}...
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ==================== COLLECTION GALLERY ====================
function CollectionGallery({
  artworks,
  movements,
  selectedMovement,
  onSelectMovement,
  onSelectArtwork,
}: {
  artworks: Artwork[]
  movements: ArtMovement[]
  selectedMovement: string | null
  onSelectMovement: (id: string | null) => void
  onSelectArtwork: (artwork: Artwork) => void
}) {
  const filteredArtworks = selectedMovement
    ? artworks.filter((a) => a.movementId === selectedMovement)
    : artworks

  return (
    <section className="bg-white py-20 px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="ornament-divider mb-6">
            <span className="text-gold text-2xl">✦</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-wide text-dark-gray md:text-4xl">
            The Collection
          </h2>
          <p className="mt-3 text-muted-foreground">
            Browse masterpieces spanning centuries of creative expression
          </p>
        </div>

        {/* Movement Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <Button
            variant={selectedMovement === null ? 'default' : 'outline'}
            size="sm"
            className={`rounded-full ${
              selectedMovement === null
                ? 'bg-dark-gray text-white hover:bg-dark-gray/90'
                : 'border-gold/30 text-dark-gray hover:border-gold hover:bg-gold/5'
            }`}
            onClick={() => onSelectMovement(null)}
          >
            All Works
          </Button>
          {movements.map((movement) => (
            <Button
              key={movement.id}
              variant={selectedMovement === movement.id ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${
                selectedMovement === movement.id
                  ? 'bg-dark-gray text-white hover:bg-dark-gray/90'
                  : 'border-gold/30 text-dark-gray hover:border-gold hover:bg-gold/5'
              }`}
              onClick={() => onSelectMovement(movement.id)}
            >
              {movement.name}
            </Button>
          ))}
        </div>

        {/* Artwork Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onSelect={onSelectArtwork}
            />
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="py-20 text-center">
            <Palette className="mx-auto h-12 w-12 text-gold/40" />
            <p className="mt-4 text-muted-foreground">
              No artworks found in this category
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

// ==================== HEADER ====================
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold">
            <span className="font-serif text-lg font-bold text-gold">G</span>
          </div>
          <span className={`font-serif text-xl font-bold tracking-wide transition-colors duration-500 ${
            scrolled ? 'text-dark-gray' : 'text-white'
          }`}>
            Galerie
          </span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {['Collections', 'Movements', 'Exhibition', 'Artists'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium tracking-wide transition-colors duration-500 hover:text-gold ${
                scrolled ? 'text-dark-gray' : 'text-white/80'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className={`transition-colors duration-500 ${
            scrolled ? 'text-dark-gray' : 'text-white'
          }`}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-dark-gray text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold">
                <span className="font-serif text-lg font-bold text-gold">G</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-wide text-white">
                Galerie
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              An interactive art history museum platform designed for art students 
              and cultural enthusiasts. Explore masterpieces across centuries of 
              human creativity.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold">
              Explore
            </h4>
            <ul className="mt-4 space-y-2">
              {['Renaissance', 'Baroque', 'Impressionism', 'Post-Impressionism', 'Modernism', 'Surrealism'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/50 hover:text-gold cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-gold">
              About
            </h4>
            <ul className="mt-4 space-y-2">
              {['Our Mission', 'Virtual Tours', 'Educational Resources', 'Contact Us'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/50 hover:text-gold cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-white/10" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/30">
            © 2024 Galerie Art History Museum. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Art for the curious mind · Culture for the wandering soul
          </p>
        </div>
      </div>
    </footer>
  )
}

// ==================== ARTIST SPOTLIGHT ====================
function ArtistSpotlight({ artworks }: { artworks: Artwork[] }) {
  // Get unique artists from featured artworks
  const featuredArtists = artworks
    .filter((a) => a.featured)
    .reduce((acc: Artist[], art) => {
      if (!acc.find((a) => a.id === art.artist.id)) {
        acc.push(art.artist)
      }
      return acc
    }, [])
    .slice(0, 4)

  return (
    <section id="artists" className="bg-gallery-gray py-20 px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="ornament-divider mb-6">
            <span className="text-gold text-2xl">✦</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-wide text-dark-gray md:text-4xl">
            Master Artists
          </h2>
          <p className="mt-3 text-muted-foreground">
            The visionaries who shaped the course of art history
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              {/* Artist avatar with gold frame */}
              <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full gold-frame-thin">
                <div className="h-full w-full bg-gradient-to-br from-gold/20 via-gallery-gray to-gold/10 flex items-center justify-center">
                  <span className="font-serif text-3xl font-bold text-gold-dark">
                    {artist.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="font-serif text-lg font-semibold text-dark-gray">
                {artist.name}
              </h3>
              <p className="mt-1 text-sm italic text-gold-dark">
                {artist.nationality}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {artist.birthYear}–{artist.deathYear || 'Present'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== MAIN PAGE ====================
export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [movements, setMovements] = useState<ArtMovement[]>([])
  const [selectedMovement, setSelectedMovement] = useState<string | null>(null)
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [artworksRes, movementsRes] = await Promise.all([
          fetch('/api/artworks'),
          fetch('/api/movements'),
        ])
        const artworksData = await artworksRes.json()
        const movementsData = await movementsRes.json()
        setArtworks(artworksData)
        setMovements(movementsData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const featuredArtworks = artworks.filter((a) => a.featured)

  const handleMovementSelect = (movement: ArtMovement) => {
    setSelectedMovement(movement.id)
    const el = document.getElementById('collections')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gallery-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="mt-4 font-serif text-lg text-dark-gray">Loading Gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gallery-white">
      <Header />

      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel artworks={featuredArtworks} />

        {/* Introduction */}
        <section className="py-16 px-6 md:px-8 bg-white">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-lg italic text-gold-dark">
                &ldquo;Art is not what you see, but what you make others see.&rdquo;
              </p>
              <p className="mt-2 text-sm text-muted-foreground">— Edgar Degas</p>
            </motion.div>
          </div>
        </section>

        {/* Art Movements */}
        <div id="movements">
          <MovementSection
            movements={movements}
            onSelect={handleMovementSelect}
          />
        </div>

        {/* Collection Gallery */}
        <div id="collections">
          <CollectionGallery
            artworks={artworks}
            movements={movements}
            selectedMovement={selectedMovement}
            onSelectMovement={setSelectedMovement}
            onSelectArtwork={setSelectedArtwork}
          />
        </div>

        {/* Artist Spotlight */}
        <ArtistSpotlight artworks={artworks} />

        {/* Virtual Exhibition */}
        <div id="exhibition">
          <VirtualExhibition artworks={artworks} />
        </div>
      </main>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <ArtworkDetail
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}

      <Footer />
    </div>
  )
}
