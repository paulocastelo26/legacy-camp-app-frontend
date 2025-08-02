import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  campInfo = {
    name: 'LGCY CAMP',
    description: 'Momentos de comunhão, diversão e crescimento espiritual te esperam no Legacy Camp 2025. Não fique de fora!',
    startDate: '14 de Nov. de 2025',
    endDate: '16 de Nov. de 2025',
    location: 'Sítio Amazônia Verde',
    address: 'Estrada do Turismo, Km 12 - Manaus, AM',
    price: 'R$ 259,99',
    priceLabel: 'Primeiro Lote',
    includes: [
      'Hospedagem em alojamentos',
      'Café da manhã, almoço e jantar',
      'Atividades recreativas',
      'Palestras e estudos bíblicos',
      'Material do acampamento'
    ]
  };

  cards: Array<{ icon: string; title: string; content: { label: string; value: string }[] }> = [];
  currentCard = 0;

  galleryImages: string[] = [
    'assets/photos/IMG_0939.JPG',
    'assets/photos/IMG_0949.JPG',
    'assets/photos/IMG_1115.JPG',
    'assets/photos/IMG_1469.JPG',
    'assets/photos/IMG_1476.JPG',
    'assets/photos/IMG_1497.JPG',
    'assets/photos/IMG_1503.JPG'
  ];
  currentImage = 0;
  private autoplayInterval: any;
  isPaused = false;
  eventDate = new Date('2025-11-14T00:00:00');
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private countdownInterval: any;
  
  // Detecção de dispositivo móvel
  isMobile = false;
  isTablet = false;
  autoplayIntervalTime = 3500; // Tempo padrão para desktop

  constructor(private router: Router) {
    this.detectDevice();
    this.cards = [
      {
        icon: 'calendar_month',
        title: 'Datas',
        content: [
          { label: 'Início', value: this.campInfo.startDate },
          { label: 'Fim', value: this.campInfo.endDate }
        ]
      },
      {
        icon: 'place',
        title: 'Local',
        content: [
          { label: this.campInfo.location, value: this.campInfo.address }
        ]
      },
      {
        icon: 'payments',
        title: 'Investimento',
        content: [
          { label: this.campInfo.priceLabel, value: this.campInfo.price },
          { label: '', value: 'À vista ou parcelado' }
        ]
      }
    ];
  }

  ngOnInit() {
    this.startAutoplay();
    this.startCountdown();
  }

  ngOnDestroy() {
    this.stopAutoplay();
    clearInterval(this.countdownInterval);
  }

  // Detectar tipo de dispositivo
  private detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const screenWidth = window.innerWidth;
    
    this.isMobile = /mobile|android|iphone|ipad|phone|blackberry|opera mini|iemobile/i.test(userAgent) || screenWidth <= 768;
    this.isTablet = screenWidth > 768 && screenWidth <= 1024;
    
    // Ajustar intervalo de autoplay baseado no dispositivo
    if (this.isMobile) {
      this.autoplayIntervalTime = 5000; // Mais lento em mobile para economizar bateria
    } else if (this.isTablet) {
      this.autoplayIntervalTime = 4000;
    }
  }

  // Listener para mudanças de orientação e redimensionamento
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectDevice();
    // Reiniciar autoplay com novo intervalo se necessário
    if (this.autoplayInterval) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  // Listener para visibilidade da página (pausar quando não visível)
  @HostListener('window:visibilitychange')
  onVisibilityChange() {
    if (document.hidden) {
      this.pauseAutoplay();
    } else {
      this.resumeAutoplay();
    }
  }

  startAutoplay() {
    // Não iniciar autoplay em dispositivos móveis se o usuário preferir movimento reduzido
    if (this.isMobile && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextImage();
      }
    }, this.autoplayIntervalTime);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  pauseAutoplay() {
    this.isPaused = true;
  }

  resumeAutoplay() {
    this.isPaused = false;
  }

  buyTicket() {
    this.router.navigate(['/inscricao']);
  }

  prevCard() {
    this.currentCard = (this.currentCard - 1 + this.cards.length) % this.cards.length;
  }

  nextCard() {
    this.currentCard = (this.currentCard + 1) % this.cards.length;
  }

  goToCard(index: number) {
    this.currentCard = index;
  }

  prevImage() {
    this.currentImage = (this.currentImage - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.galleryImages.length;
  }

  goToImage(index: number) {
    this.currentImage = index;
  }

  startCountdown() {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.eventDate.getTime() - now;
    if (distance > 0) {
      this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    } else {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  // Retorna as 3 imagens visíveis no carrossel: anterior, atual e próxima
  getVisibleImages(): string[] {
    const total = this.galleryImages.length;
    const prev = (this.currentImage - 1 + total) % total;
    const next = (this.currentImage + 1) % total;
    return [
      this.galleryImages[prev],
      this.galleryImages[this.currentImage],
      this.galleryImages[next]
    ];
  }

  // Otimização para touch: prevenir zoom em imagens
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    // Prevenir zoom em imagens da galeria
    if ((event.target as HTMLElement).tagName === 'IMG') {
      event.preventDefault();
    }
  }
} 