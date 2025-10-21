import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { InscricaoService, Inscricao } from '../../../services/inscricao.service';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  inscricoes: Inscricao[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';
  statusFilter: string = '';
  loteFilter: string = '';
  paymentMethodFilter: string = '';
  couponFilter: string = '';
  showDetailsModal: boolean = false;
  selectedInscricao: Inscricao | null = null;

  // Propriedades de paginação
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  // Propriedade para acessar Math no template
  Math = Math;

  constructor(
    private inscricaoService: InscricaoService,
    private authService: AuthService,
    private router: Router,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.carregarInscricoes();
  }

  carregarInscricoes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.inscricaoService.listarInscricoes().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.inscricoes = data || [];
        console.log('Inscrições carregadas:', this.inscricoes.length);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar inscrições:', error);
        this.errorMessage = 'Erro ao carregar inscrições. Tente novamente.';
        this.isLoading = false;
        this.inscricoes = []; // Garantir que a lista esteja vazia em caso de erro
      }
    });
  }

  get inscricoesFiltradas(): Inscricao[] {
    let filtradas = this.inscricoes || [];

    if (this.searchTerm) {
      const termo = this.searchTerm.toLowerCase();
      filtradas = filtradas.filter(inscricao =>
        inscricao.fullName.toLowerCase().includes(termo) ||
        inscricao.email.toLowerCase().includes(termo) ||
        inscricao.phone.includes(termo)
      );
    }

    if (this.statusFilter) {
      filtradas = filtradas.filter(inscricao =>
        inscricao.status === this.statusFilter
      );
    }

    if (this.loteFilter) {
      filtradas = filtradas.filter(inscricao =>
        inscricao.registrationLot === this.loteFilter
      );
    }

    if (this.paymentMethodFilter) {
      filtradas = filtradas.filter(inscricao =>
        inscricao.paymentMethod === this.paymentMethodFilter
      );
    }

    if (this.couponFilter) {
      if (this.couponFilter === 'sem_cupom') {
        filtradas = filtradas.filter(inscricao =>
          !inscricao.couponCode || inscricao.couponCode.trim() === ''
        );
      } else {
        const cupomNormalizado = this.couponFilter.trim();
        filtradas = filtradas.filter(inscricao =>
          inscricao.couponCode && inscricao.couponCode.trim() === cupomNormalizado
        );
      }
    }

    // Calcular total de páginas
    this.totalPages = Math.ceil(filtradas.length / this.itemsPerPage);
    
    // Aplicar paginação
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    return filtradas.slice(startIndex, endIndex);
  }

  get totalInscricoesFiltradas(): number {
    let filtradas = this.inscricoes;

    if (this.searchTerm) {
      const termo = this.searchTerm.toLowerCase();
      filtradas = filtradas.filter(inscricao =>
        inscricao.fullName.toLowerCase().includes(termo) ||
        inscricao.email.toLowerCase().includes(termo) ||
        inscricao.phone.includes(termo)
      );
    }

    if (this.statusFilter) {
      filtradas = filtradas.filter(inscricao =>
        inscricao.status === this.statusFilter
      );
    }

    if (this.loteFilter) {
      filtradas = filtradas.filter(inscricao =>
        inscricao.registrationLot === this.loteFilter
      );
    }

    if (this.paymentMethodFilter) {
      filtradas = filtradas.filter(inscricao =>
        inscricao.paymentMethod === this.paymentMethodFilter
      );
    }

    if (this.couponFilter) {
      if (this.couponFilter === 'sem_cupom') {
        filtradas = filtradas.filter(inscricao =>
          !inscricao.couponCode || inscricao.couponCode.trim() === ''
        );
      } else {
        const cupomNormalizado = this.couponFilter.trim();
        filtradas = filtradas.filter(inscricao =>
          inscricao.couponCode && inscricao.couponCode.trim() === cupomNormalizado
        );
      }
    }

    return filtradas.length;
  }

  atualizarStatus(inscricao: Inscricao, novoStatus: string): void {
    if (inscricao.id) {
      // Atualizar imediatamente na interface para feedback visual
      const index = this.inscricoes.findIndex(i => i.id === inscricao.id);
      if (index !== -1) {
        this.inscricoes[index].status = novoStatus;
      }

      // Enviar para o servidor
      this.inscricaoService.atualizarStatus(inscricao.id, novoStatus).subscribe({
        next: (inscricaoAtualizada) => {
          // Atualizar com dados completos do servidor
          if (index !== -1) {
            this.inscricoes[index] = { ...this.inscricoes[index], ...inscricaoAtualizada };
          }
          console.log('Status atualizado no servidor:', novoStatus, 'para inscrição:', inscricao.fullName);
        },
        error: (error) => {
          console.error('Erro ao atualizar status:', error);
          // Reverter mudança em caso de erro
          if (index !== -1) {
            this.inscricoes[index].status = inscricao.status; // Reverter para status anterior
          }
          alert('Erro ao atualizar status. Tente novamente.');
        }
      });
    }
  }

  enviarContrato(inscricao: Inscricao): void {
    if (!inscricao.id) {
      alert('Inscrição sem ID.');
      return;
    }
    this.emailService.sendContract(inscricao.id).subscribe({
      next: () => alert('Contrato enviado com sucesso.'),
      error: (error) => {
        console.error('Erro ao enviar contrato:', error);
        alert('Erro ao enviar contrato. Tente novamente.');
      }
    });
  }

  removerInscricao(inscricao: Inscricao): void {
    if (confirm(`Tem certeza que deseja remover a inscrição de ${inscricao.fullName}?`)) {
      if (inscricao.id) {
        this.inscricaoService.removerInscricao(inscricao.id).subscribe({
          next: () => {
            this.inscricoes = this.inscricoes.filter(i => i.id !== inscricao.id);
          },
          error: (error) => {
            console.error('Erro ao remover inscrição:', error);
            alert('Erro ao remover inscrição. Tente novamente.');
          }
        });
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  formatarData(data: string | Date | undefined): string {
    if (!data) return '-';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'PENDENTE': return 'status-pendente';
      case 'PARCIAL_01': return 'status-parcial-01';
      case 'PARCIAL_02': return 'status-parcial-02';
      case 'PARCIAL_03': return 'status-parcial-03';
      case 'PARCIAL_04': return 'status-parcial-04';
      case 'APROVADO': return 'status-aprovado';
      case 'REJEITADO': return 'status-rejeitado';
      default: return 'status-pendente';
    }
  }

  // Método para obter status disponíveis baseado no método de pagamento
  getStatusDisponiveis(paymentMethod: string): string[] {
    if (paymentMethod === 'carne') {
      return [
        'PENDENTE',
        'PARCIAL_01', 
        'PARCIAL_02',
        'PARCIAL_03',
        'PARCIAL_04',
        'APROVADO',
        'REJEITADO'
      ];
    } else {
      // PIX e Cartão - fluxo mais simples
      return [
        'PENDENTE',
        'APROVADO',
        'REJEITADO'
      ];
    }
  }

  // Método para obter descrição do status
  getStatusDescription(status: string): string {
    switch (status) {
      case 'PENDENTE': return 'Aguardando análise';
      case 'PARCIAL_01': return 'Pagou 1ª parcela do carnê';
      case 'PARCIAL_02': return 'Pagou 2ª parcela do carnê';
      case 'APROVADO': return 'Pagamento completo - Aprovado';
      case 'REJEITADO': return 'Inscrição rejeitada';
      default: return 'Status desconhecido';
    }
  }

  getInscricoesPorStatus(status: string): number {
    return this.inscricoes.filter(inscricao => inscricao.status === status).length;
  }

  getInscricoesPorLote(lote: string): number {
    return this.inscricoes.filter(inscricao => inscricao.registrationLot === lote).length;
  }

  getInscricoesPorTipoPagamento(tipoPagamento: string): number {
    return this.inscricoes.filter(inscricao => inscricao.paymentMethod === tipoPagamento).length;
  }

  getInscricoesPorCupom(cupom: string): number {
    if (!this.inscricoes || this.inscricoes.length === 0) {
      return 0;
    }
    
    if (cupom === 'sem_cupom') {
      return this.inscricoes.filter(inscricao => 
        !inscricao.couponCode || inscricao.couponCode.trim() === ''
      ).length;
    }
    
    // Normalizar cupom para comparação
    const cupomNormalizado = cupom.trim();
    return this.inscricoes.filter(inscricao => 
      inscricao.couponCode && inscricao.couponCode.trim() === cupomNormalizado
    ).length;
  }

  getCuponsUnicos(): string[] {
    if (!this.inscricoes || this.inscricoes.length === 0) {
      return [];
    }
    
    const cupons = this.inscricoes
      .map(inscricao => inscricao.couponCode)
      .filter((cupom): cupom is string => cupom !== undefined && cupom !== null && cupom.trim() !== '')
      .map(cupom => cupom.trim()) // Normalizar espaços em branco
      .filter((cupom, index, array) => array.indexOf(cupom) === index); // Remover duplicatas
    
    // Log para debug - remover em produção
    console.log('Cupons encontrados:', cupons);
    console.log('Total de inscrições:', this.inscricoes.length);
    
    return cupons.sort();
  }

  formatarCupom(cupom: string | undefined | null): string {
    if (!cupom || cupom.trim() === '') {
      return '-';
    }
    return cupom;
  }

  getCupomBadgeClass(cupom: string | undefined | null): string {
    if (!cupom || cupom.trim() === '') {
      return 'cupom-badge no-cupom';
    }
    
    // Diferentes classes para diferentes tipos de cupom
    if (cupom.includes('LGCYBV')) {
      return 'cupom-badge cupom-bv';
    } else if (cupom.includes('LGCYITA')) {
      return 'cupom-badge cupom-ita';
    } else if (cupom.includes('LGCYSTAFF')) {
      return 'cupom-badge cupom-staff';
    }
    
    return 'cupom-badge cupom-other';
  }

  limparFiltros(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.loteFilter = '';
    this.paymentMethodFilter = '';
    this.couponFilter = '';
    this.currentPage = 1; // Reset para primeira página
  }

  // Métodos de paginação
  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
    }
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  proximaPagina(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  alterarItensPorPagina(novoValor: number): void {
    this.itemsPerPage = novoValor;
    this.currentPage = 1; // Reset para primeira página
  }

  get paginasVisiveis(): number[] {
    const paginas: number[] = [];
    const maxVisiveis = 5;
    let inicio = Math.max(1, this.currentPage - Math.floor(maxVisiveis / 2));
    let fim = Math.min(this.totalPages, inicio + maxVisiveis - 1);
    
    if (fim - inicio + 1 < maxVisiveis) {
      inicio = Math.max(1, fim - maxVisiveis + 1);
    }
    
    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }
    
    return paginas;
  }

  abrirDetalhes(inscricao: Inscricao): void {
    this.selectedInscricao = inscricao;
    this.showDetailsModal = true;
  }

  fecharDetalhes(): void {
    this.showDetailsModal = false;
    this.selectedInscricao = null;
  }

  formatarDataCompleta(data: string | Date | undefined): string {
    if (!data) return '-';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
  }

  formatarBoolean(valor: boolean | undefined): string {
    return valor ? 'Sim' : 'Não';
  }

  exportarExcel(): void {
    this.isLoading = true;
    
    this.inscricaoService.exportarExcel().subscribe({
      next: (blob) => {
        // Criar um link para download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Gerar nome do arquivo com data atual
        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR').replace(/\//g, '-');
        const nomeArquivo = `inscricoes-legacy-camp-${dataFormatada}.xlsx`;
        
        link.download = nomeArquivo;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Limpar o URL criado
        window.URL.revokeObjectURL(url);
        
        this.isLoading = false;
        console.log('Arquivo Excel exportado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao exportar Excel:', error);
        this.isLoading = false;
        alert('Erro ao exportar arquivo Excel. Tente novamente.');
      }
    });
  }
}
