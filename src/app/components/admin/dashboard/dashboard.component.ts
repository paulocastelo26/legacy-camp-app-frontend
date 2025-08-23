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
  showDetailsModal: boolean = false;
  selectedInscricao: Inscricao | null = null;

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
        this.inscricoes = data;

        console.log(this.inscricoes)
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar inscrições:', error);
        this.errorMessage = 'Erro ao carregar inscrições. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  get inscricoesFiltradas(): Inscricao[] {
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

    return filtradas;
  }

  atualizarStatus(inscricao: Inscricao, novoStatus: string): void {
    if (inscricao.id) {
      this.inscricaoService.atualizarStatus(inscricao.id, novoStatus).subscribe({
        next: (inscricaoAtualizada) => {
          const index = this.inscricoes.findIndex(i => i.id === inscricao.id);
          if (index !== -1) {
            this.inscricoes[index] = inscricaoAtualizada;
          }
        },
        error: (error) => {
          console.error('Erro ao atualizar status:', error);
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
      case 'APROVADO': return 'status-aprovado';
      case 'PENDENTE': return 'status-pendente';
      case 'REJEITADO': return 'status-rejeitado';
      default: return 'status-pendente';
    }
  }

  getInscricoesPorStatus(status: string): number {
    return this.inscricoes.filter(inscricao => inscricao.status === status).length;
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
}
