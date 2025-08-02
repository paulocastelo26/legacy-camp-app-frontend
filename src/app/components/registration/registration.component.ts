import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InscricaoService, Inscricao } from '../../services/inscricao.service';

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

  pixKey = 'lgcymanaus@gmail.com';

  // Propriedades do modal
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';
  modalButtonText = 'OK';

  // Propriedades do modal PIX
  showPixModal = false;
  pixKeyCopied = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inscricaoService: InscricaoService
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

  // Métodos do modal PIX
  onPaymentMethodChange(method: string) {
    if (method === 'pix') {
      this.showPixModal = true;
    }
  }

  closePixModal() {
    this.showPixModal = false;
  }

  getPixValue(): string {
    const lot = this.registrationForm.get('registrationLot')?.value;
    if (lot === 'lote1') {
      return 'R$ 250,00';
    } else if (lot === 'lote2') {
      return 'R$ 300,00';
    }
    return 'R$ 300,00';
  }

  copyPixKey() {
    const pixKey = 'lgcymanaus@gmail.com';
    navigator.clipboard.writeText(pixKey).then(() => {
      this.pixKeyCopied = true;
      setTimeout(() => {
        this.pixKeyCopied = false;
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar chave PIX:', err);
    });
  }
} 