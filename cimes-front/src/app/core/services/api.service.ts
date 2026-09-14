import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AbonnementApi,
  AbonnementPayload,
  Color,
  CoursApi,
  CoursPayload,
  InscriptionApi,
  MoniteurApi,
  MoniteurPayload,
  PisteApi,
  PistePayload,
  SkieurApi,
  SkieurPayload,
  Support,
  TypeAbonnement,
  TypeCours,
} from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  private url(path: string): string {
    return this.baseUrl + path;
  }

  pistesAll() {
    return firstValueFrom(this.http.get<PisteApi[]>(this.url('/piste/all')));
  }
  addPiste(body: PistePayload) {
    return firstValueFrom(this.http.post<PisteApi>(this.url('/piste/add'), body));
  }
  updatePiste(body: PistePayload & { numPiste: number }) {
    return firstValueFrom(this.http.put<PisteApi>(this.url('/piste/update'), body));
  }
  deletePiste(id: number) {
    return firstValueFrom(this.http.delete<void>(this.url(`/piste/${id}`)));
  }

  coursAll() {
    return firstValueFrom(this.http.get<CoursApi[]>(this.url('/cours/all')));
  }
  addCours(body: CoursPayload) {
    return firstValueFrom(this.http.post<CoursApi>(this.url('/cours/add'), body));
  }
  updateCours(body: CoursPayload & { numCours: number }) {
    return firstValueFrom(this.http.put<CoursApi>(this.url('/cours/update'), body));
  }
  deleteCours(id: number) {
    return firstValueFrom(this.http.delete<void>(this.url(`/cours/${id}`)));
  }
  coursByType(type: TypeCours) {
    return firstValueFrom(this.http.get<CoursApi[]>(this.url(`/cours/byType/${type}`)));
  }
  coursBySupport(support: Support) {
    return firstValueFrom(this.http.get<CoursApi[]>(this.url(`/cours/bySupport/${support}`)));
  }

  moniteursAll() {
    return firstValueFrom(this.http.get<MoniteurApi[]>(this.url('/moniteur/all')));
  }
  addMoniteur(body: MoniteurPayload) {
    return firstValueFrom(this.http.post<MoniteurApi>(this.url('/moniteur/add'), body));
  }
  updateMoniteur(body: MoniteurPayload & { numMoniteur: number }) {
    return firstValueFrom(this.http.put<MoniteurApi>(this.url('/moniteur/update'), body));
  }
  addMoniteurAndAssignToCours(coursId: number, body: MoniteurPayload) {
    return firstValueFrom(
      this.http.post<MoniteurApi>(this.url(`/moniteur/addAndAssignToCours/${coursId}`), body),
    );
  }
  deleteMoniteur(id: number) {
    return firstValueFrom(this.http.delete<void>(this.url(`/moniteur/${id}`)));
  }
  bestMoniteur() {
    return firstValueFrom(this.http.put<MoniteurApi>(this.url('/moniteur/best'), {}));
  }
  moniteurWeeks(id: number, support: Support) {
    return firstValueFrom(this.http.get<number[]>(this.url(`/moniteur/weeks/${id}/${support}`)));
  }

  skieursAll() {
    return firstValueFrom(this.http.get<SkieurApi[]>(this.url('/skieur/all')));
  }
  addSkieur(body: SkieurPayload) {
    return firstValueFrom(this.http.post<SkieurApi>(this.url('/skieur/add'), body));
  }
  updateSkieur(body: SkieurPayload & { numSkieur: number }) {
    return firstValueFrom(this.http.put<SkieurApi>(this.url('/skieur/update'), body));
  }
  addSkieurAndAssignToCours(coursId: number, body: SkieurPayload) {
    return firstValueFrom(
      this.http.post<SkieurApi>(this.url(`/skieur/addAndAssignToCours/${coursId}`), body),
    );
  }
  deleteSkieur(id: number) {
    return firstValueFrom(this.http.delete<void>(this.url(`/skieur/${id}`)));
  }
  assignSkieurToPiste(skieurId: number, pisteId: number) {
    return firstValueFrom(this.http.put<SkieurApi>(this.url(`/skieur/assignToPiste/${skieurId}/${pisteId}`), {}));
  }
  skieursByTypeAbonnement(type: TypeAbonnement) {
    return firstValueFrom(this.http.get<SkieurApi[]>(this.url(`/skieur/byTypeAbonnement/${type}`)));
  }
  nombreParCouleurPiste() {
    return firstValueFrom(this.http.get<Record<Color, number>>(this.url('/skieur/nombreParCouleurPiste')));
  }

  inscriptionsAll() {
    return firstValueFrom(this.http.get<InscriptionApi[]>(this.url('/inscription/all')));
  }
  inscriptionsByCours(coursId: number) {
    return firstValueFrom(this.http.get<InscriptionApi[]>(this.url(`/inscription/byCours/${coursId}`)));
  }
  inscriptionsBySkieur(skieurId: number) {
    return firstValueFrom(this.http.get<InscriptionApi[]>(this.url(`/inscription/bySkieur/${skieurId}`)));
  }
  addInscription(skieurId: number, coursId: number, numSemaine: number) {
    return firstValueFrom(
      this.http.post<InscriptionApi>(this.url(`/inscription/addAndAssign/${skieurId}/${coursId}`), { numSemaine }),
    );
  }
  assignInscriptionToCours(inscriptionId: number, coursId: number) {
    return firstValueFrom(
      this.http.put<InscriptionApi>(this.url(`/inscription/assignToCours/${inscriptionId}/${coursId}`), {}),
    );
  }
  deleteInscription(id: number) {
    return firstValueFrom(this.http.delete<void>(this.url(`/inscription/${id}`)));
  }

  abonnementsAll() {
    return firstValueFrom(this.http.get<AbonnementApi[]>(this.url('/abonnement/all')));
  }
  updateAbonnement(body: AbonnementPayload) {
    return firstValueFrom(this.http.put<AbonnementApi>(this.url('/abonnement/update'), body));
  }
  abonnementsByType(type: TypeAbonnement) {
    return firstValueFrom(this.http.get<AbonnementApi[]>(this.url(`/abonnement/byType/${type}`)));
  }
  abonnementsByDates(startDate: string, endDate: string) {
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return firstValueFrom(this.http.get<AbonnementApi[]>(this.url('/abonnement/byDates'), { params }));
  }
}
