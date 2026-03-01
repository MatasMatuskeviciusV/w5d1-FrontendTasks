import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConferenceStoreService } from '../conference-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conference-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './conference-form.html',
})
export class ConferenceForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(ConferenceStoreService);

  readonly tracks = this.store.tracks;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    abstract: ['', [Validators.required, Validators.minLength(10)]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    trackId: ['', [Validators.required]],
  });

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  submit(): void {
    if (!this.form.valid) return;

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const raw = this.form.getRawValue();
    const payload = {
      ...raw,
      trackId: Number(raw.trackId),
    } as any;

    this.store.createSession(payload).subscribe({
      next: (newSession) => {
        this.form.reset();
        this.successMessage = `Session "${newSession.title}" created!`;
        this.isSubmitting = false;

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err: any) => {
        this.errorMessage = err.message || 'Failed to create session';
        this.isSubmitting = false;
      },
    });
  }
}