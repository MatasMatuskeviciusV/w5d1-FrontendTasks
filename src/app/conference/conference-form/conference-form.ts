import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConferenceStoreService } from '../conference-store.service';
import type { SessionCreate } from '../../models/session.model';

@Component({
  selector: 'app-conference-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './conference-form.html',
  styleUrls: ['./conference-form.css'],
})
export class ConferenceForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(ConferenceStoreService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly tracks = this.store.tracks;
  readonly sessions = this.store.sessions;

  readonly sessionId = signal<number | null>(null);

  readonly isEditMode = computed(() => this.sessionId() !== null);

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    abstract: ['', [Validators.required, Validators.minLength(10)]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    trackId: [1, [Validators.required]],
  });

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const raw = params.get('id');
      this.sessionId.set(raw ? Number(raw) : null);
      this.errorMessage = '';
      this.successMessage = '';
    });

    effect(() => {
      const id = this.sessionId();
      if (!id) {
        this.form.reset({ trackId: 1 });
        this.form.enable();
        return;
      }

      const session = this.sessions().find((s) => s.id === id);

      if (!session) return;

      this.form.enable();
      this.form.patchValue({
        title: session.title,
        abstract: session.abstract,
        startTime: session.startTime,
        endTime: session.endTime,
        trackId: session.trackId,
      });
    });
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const raw = this.form.getRawValue();
    const payload: SessionCreate = {
      title: raw.title,
      abstract: raw.abstract,
      startTime: raw.startTime,
      endTime: raw.endTime,
      trackId: Number(raw.trackId),
    };

    const id = this.sessionId();

    if (id) {
      this.store.updateSession(id, payload).subscribe({
        next: (updated) => {
          this.successMessage = `Session "${updated.title}" saved!`;
          this.isSubmitting = false;

          this.router.navigate(['/sessions']);
        },
        error: (err: any) => {
          this.errorMessage = err?.message || 'Failed to update session';
          this.isSubmitting = false;
        },
      });
      return;
    }

    this.store.createSession(payload).subscribe({
      next: (created) => {
        this.successMessage = `Session "${created.title}" created!`;
        this.isSubmitting = false;

        this.router.navigate(['/sessions', created.id]);
      },
      error: (err: any) => {
        this.errorMessage = err?.message || 'Failed to create session';
        this.isSubmitting = false;
      },
    });
  }
}