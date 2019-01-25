import { Component } from 'react';
import { NativeModules } from 'react-native';

export = RNTrackPlayer;
export as namespace RNTrackPlayer;

declare namespace RNTrackPlayer {
  export type EventType =
    | 'playback-state'
    | 'playback-error'
    | 'playback-queue-ended'
    | 'playback-track-changed'
    | 'remote-play'
    | 'remote-pause'
    | 'remote-stop'
    | 'remote-next'
    | 'remote-previous'
    | 'remote-jump-forward'
    | 'remote-jump-backward'
    | 'remote-seek';

  type Handler = (type: EventType, ...args: any[]) => void;
  export function registerEventHandler(handler: Handler): void;

  // General

  export interface PlayerOptions {
    ratingType?: any;
    maxArtworkSize?: number;
    capabilities?: string[];
    compactCapabilities?: string[];

    icon?: number;
    playIcon?: number;
    pauseIcon?: number;
    stopIcon?: number;
    previousIcon?: number;
    nextIcon?: number;
    color?: number;

    stopWithApp?: boolean;
  }

  export function setupPlayer(options?: PlayerOptions): Promise<void>;
  export function destroy(): void;
  export function updateOptions(options?: PlayerOptions): Promise<void>;

  // Player Queue Commands

  type TrackRessource = string | number;

  export interface Track {
    id: string;
    url:
      | TrackRessource
      | {
          uri: TrackRessource;
          headers?: {
            [key: string]: string;
          };
        };
    type?: string;
    contentType?: string;
    duration?: number;
    title: string;
    artist: string;
    album?: string;
    description?: string;
    genre?: string;
    date?: string;
    rating?: any;
    artwork?: string;
    sendUrl?: boolean;
    [key: string]: any;
  }

  export function add(tracks: Track | Track[], insertBeforeId?: string): Promise<void>;
  export function remove(trackIds: string | string[]): Promise<void>;
  export function skip(trackId: string): Promise<void>;
  export function getQueue(): Promise<Track[]>;
  export function skipToNext(): Promise<void>;
  export function skipToPrevious(): Promise<void>;
  export function removeUpcomingTracks(): Promise<void>;

  // Event Listener Binding
  export function addEventListener(type: EventType, handler: (args: any) => void);

  // Player Playback Commands

  export function reset(): Promise<void>;
  export function play(): Promise<void>;
  export function pause(): Promise<void>;
  export function stop(): Promise<void>;
  export function seekTo(time: number): Promise<void>;
  export function setVolume(level: number): Promise<void>;
  export function setRate(rate: number): Promise<void>;

  // Player Getters

  export function getTrack(id: string): Promise<Track>;
  export function getCurrentTrack(): Promise<string>;
  export function getVolume(): Promise<number>;
  export function getDuration(): Promise<number>;
  export function getPosition(): Promise<number>;
  export function getBufferedPosition(): Promise<number>;
  export function getState(): Promise<string>;
  export function getRate(): Promise<number>;

  export const STATE_NONE: string;
  export const STATE_PLAYING: string;
  export const STATE_PAUSED: string;
  export const STATE_STOPPED: string;
  export const STATE_BUFFERING: string;

  // Capabilities
  export const CAPABILITY_PLAY: string;
  export const CAPABILITY_PLAY_FROM_ID: string;
  export const CAPABILITY_PLAY_FROM_SEARCH: string;
  export const CAPABILITY_PAUSE: string;
  export const CAPABILITY_STOP: string;
  export const CAPABILITY_SEEK_TO: string;
  export const CAPABILITY_SKIP: string;
  export const CAPABILITY_SKIP_TO_NEXT: string;
  export const CAPABILITY_SKIP_TO_PREVIOUS: string;
  export const CAPABILITY_JUMP_FORWARD: string;
  export const CAPABILITY_JUMP_BACKWARD: string;
  export const CAPABILITY_SET_RATING: string;

  // Pitch algorithms
  export const PITCH_ALGORITHM_LINEAR: string;
  export const PITCH_ALGORITHM_MUSIC: string;
  export const PITCH_ALGORITHM_VOICE: string;

  // Rating Types
  export const RATING_HEART: string;
  export const RATING_THUMBS_UP_DOWN: string;
  export const RATING_3_STARS: string;
  export const RATING_4_STARS: string;
  export const RATING_5_STARS: string;
  export const RATING_PERCENTAGE: string;
}

// Components

export interface ProgressComponentState {
  position: number;
  bufferedPosition: number;
  duration: number;
}

export class ProgressComponent<P = {}, S = {}> extends Component<P, ProgressComponentState & S> {
  public getProgress: () => number;
  public getBufferedProgress: () => number;
}
