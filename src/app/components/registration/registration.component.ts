import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InscricaoService, Inscricao } from '../../services/inscricao.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  isSubmitting = false;
  submitted = false;

  pixKey = 'pix.legacy.am@gmail.com';

  // Propriedades do modal
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';
  modalButtonText = 'OK';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inscricaoService: InscricaoService,
    private emailService: EmailService
  ) {
    this.registrationForm = this.fb.group({
      // Informações Pessoais
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(12), Validators.max(100)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      socialMedia: [''],
      emergencyContact: this.fb.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        relationship: ['', [Validators.required]]
      }),

      // Informações de Igreja
      isLagoinhaMember: ['', [Validators.required]],
      churchName: ['', [Validators.required]],
      ministryParticipation: [''],

      // Informações da Inscrição
      registrationLot: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      paymentProof: [''],

      // Informações Adicionais
      shirtSize: ['', [Validators.required]],
      hasAllergy: ['', [Validators.required]],
      allergyDetails: [''],
      usesMedication: [''],
      medicationDetails: [''],
      dietaryRestriction: ['Nenhuma'],

      // Enfoque e Cuidado
      hasMinistryTest: ['', [Validators.required]],
      ministryTestResults: [''],
      prayerRequest: ['', [Validators.required]],

      // Termos e Autorização
      imageAuthorization: [false, [Validators.requiredTrue]],
      analysisAwareness: [false, [Validators.requiredTrue]],
      termsAwareness: [false, [Validators.requiredTrue]],
      truthDeclaration: [false, [Validators.requiredTrue]]
    });

    // Adicionar validações condicionais
    this.setupConditionalValidations();
    
    // Adicionar validação para lote e método de pagamento
    this.setupLotPaymentValidation();
  }

  setupConditionalValidations() {
    // Validação condicional para churchName
    this.registrationForm.get('isLagoinhaMember')?.valueChanges.subscribe(value => {
      const churchNameControl = this.registrationForm.get('churchName');
      if (value === 'sim') {
        churchNameControl?.setValidators([Validators.required]);
      } else {
        churchNameControl?.clearValidators();
        churchNameControl?.setValue('');
      }
      churchNameControl?.updateValueAndValidity();
    });

    // Validação condicional para allergyDetails
    this.registrationForm.get('hasAllergy')?.valueChanges.subscribe(value => {
      const allergyDetailsControl = this.registrationForm.get('allergyDetails');
      if (value === 'sim') {
        allergyDetailsControl?.setValidators([Validators.required]);
      } else {
        allergyDetailsControl?.clearValidators();
        allergyDetailsControl?.setValue('');
      }
      allergyDetailsControl?.updateValueAndValidity();
    });

    // Validação condicional para medicationDetails
    this.registrationForm.get('usesMedication')?.valueChanges.subscribe(value => {
      const medicationDetailsControl = this.registrationForm.get('medicationDetails');
      if (value === 'sim') {
        medicationDetailsControl?.setValidators([Validators.required]);
      } else {
        medicationDetailsControl?.clearValidators();
        medicationDetailsControl?.setValue('');
      }
      medicationDetailsControl?.updateValueAndValidity();
    });

    // Validação condicional para ministryTestResults
    this.registrationForm.get('hasMinistryTest')?.valueChanges.subscribe(value => {
      const ministryTestResultsControl = this.registrationForm.get('ministryTestResults');
      if (value === 'sim') {
        ministryTestResultsControl?.setValidators([Validators.required]);
      } else {
        ministryTestResultsControl?.clearValidators();
        ministryTestResultsControl?.setValue('');
      }
      ministryTestResultsControl?.updateValueAndValidity();
    });
  }

  setupLotPaymentValidation() {
    // Validação condicional para método de pagamento baseado no lote
    this.registrationForm.get('registrationLot')?.valueChanges.subscribe(lot => {
      const paymentMethodControl = this.registrationForm.get('paymentMethod');
      const currentPaymentMethod = paymentMethodControl?.value;
      
      // Se mudou para 1º lote e estava selecionado carnê, limpar seleção
      if (lot === 'lote1' && currentPaymentMethod === 'carne') {
        paymentMethodControl?.setValue('');
      }
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  get emergencyContact() {
    return this.registrationForm.get('emergencyContact') as FormGroup;
  }

  calculateAge() {
    const birthDate = this.registrationForm.get('birthDate')?.value;
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      this.registrationForm.patchValue({ age: age });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      
      // Preparar dados para envio
      const formData = this.registrationForm.value;
      const inscricao: Inscricao = {
        fullName: formData.fullName,
        birthDate: formData.birthDate,
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        socialMedia: formData.socialMedia,
        emergencyContactName: formData.emergencyContact.name,
        emergencyContactPhone: formData.emergencyContact.phone,
        emergencyContactRelationship: formData.emergencyContact.relationship,
        isLagoinhaMember: formData.isLagoinhaMember,
        churchName: formData.churchName,
        ministryParticipation: formData.ministryParticipation,
        registrationLot: formData.registrationLot,
        paymentMethod: formData.paymentMethod,
        paymentProof: formData.paymentProof,
        shirtSize: formData.shirtSize,
        hasAllergy: formData.hasAllergy,
        allergyDetails: formData.allergyDetails,
        usesMedication: formData.usesMedication,
        medicationDetails: formData.medicationDetails,
        dietaryRestriction: formData.dietaryRestriction,
        hasMinistryTest: formData.hasMinistryTest,
        ministryTestResults: formData.ministryTestResults,
        prayerRequest: formData.prayerRequest,
        imageAuthorization: formData.imageAuthorization,
        analysisAwareness: formData.analysisAwareness,
        termsAwareness: formData.termsAwareness,
        truthDeclaration: formData.truthDeclaration
      };

      // Enviar para o backend
      this.inscricaoService.criarInscricao(inscricao).subscribe({
        next: (response) => {
          console.log('Inscrição criada com sucesso:', response);
          const inscricaoId = response?.id;

          if (inscricaoId) {
            this.emailService.sendPaymentInstructions(inscricaoId).subscribe({
              next: () => {
                console.log('Email de instruções de pagamento enviado.');
              },
              error: (emailErr) => {
                console.error('Falha ao enviar email de instruções de pagamento:', emailErr);
              }
            });
          }

          this.isSubmitting = false;
          this.showSuccessModal('Inscrição realizada com sucesso! Em breve entraremos em contato com mais informações e contrato.');
        },
        error: (error) => {
          console.error('Erro ao criar inscrição:', error);
          this.isSubmitting = false;
          this.showErrorModal('Erro ao enviar inscrição. Tente novamente.');
        }
      });
    }
  }

  formatPhone(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }
    
    this.registrationForm.patchValue({ phone: value });
  }

  formatEmergencyPhone(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }
    
    this.emergencyContact.patchValue({ phone: value });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  // Métodos do modal
  showSuccessModal(message: string) {
    this.modalTitle = 'Sucesso!';
    this.modalMessage = message;
    this.modalType = 'success';
    this.modalButtonText = 'OK';
    this.showModal = true;
  }

  showErrorModal(message: string) {
    this.modalTitle = 'Erro!';
    this.modalMessage = message;
    this.modalType = 'error';
    this.modalButtonText = 'Tentar Novamente';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    if (this.modalType === 'success') {
      this.router.navigate(['/']);
    }
  }

  // Método para verificar se deve mostrar informações de pagamento
  shouldShowPaymentInfo(): boolean {
    const lot = this.registrationForm.get('registrationLot')?.value;
    const paymentMethod = this.registrationForm.get('paymentMethod')?.value;
    
    // Mostra informações apenas para PIX ou cartão de crédito, não para carnê
    return (paymentMethod === 'pix' || paymentMethod === 'cartao') && (lot === 'lote1' || lot === 'lote2');
  }

  // Método para verificar se deve mostrar chave PIX
  shouldShowPixKey(): boolean {
    const paymentMethod = this.registrationForm.get('paymentMethod')?.value;
    return paymentMethod === 'pix';
  }

  // Método para verificar se deve mostrar link do Mercado Pago
  shouldShowMercadoPagoLink(): boolean {
    const paymentMethod = this.registrationForm.get('paymentMethod')?.value;
    return paymentMethod === 'cartao';
  }

  // Método para obter o link de pagamento correto
  getPaymentLink(): string {
    const lot = this.registrationForm.get('registrationLot')?.value;
    
    if (lot === 'lote1') {
      return 'https://mpago.la/1W4jnL2';
    } else if (lot === 'lote2') {
      return 'https://mpago.la/22L9ag7';
    }
    
    return '';
  }

  // Método para abrir o link de pagamento em nova aba
  openPaymentLink() {
    const link = this.getPaymentLink();
    if (link) {
      window.open(link, '_blank');
    }
  }

  // Método para copiar chave PIX
  copyPixKey() {
    navigator.clipboard.writeText(this.pixKey).then(() => {
      // Aqui você pode adicionar uma notificação de sucesso se desejar
      console.log('Chave PIX copiada para a área de transferência');
    }).catch(err => {
      console.error('Erro ao copiar chave PIX:', err);
    });
  }

  // Método para verificar se deve mostrar opção de carnê
  shouldShowCarneOption(): boolean {
    const lot = this.registrationForm.get('registrationLot')?.value;
    // Carnê só disponível para o 2º lote
    return lot === 'lote2';
  }
} 