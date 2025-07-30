import { Component, OnInit, OnDestroy } from '@angular/core';
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
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80'
  ];
  currentImage = 0;
  private autoplayInterval: any;
  isPaused = false;
  eventDate = new Date('2025-11-14T00:00:00');
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private countdownInterval: any;

  constructor(private router: Router) {
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

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextImage();
      }
    }, 3500);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
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
} 