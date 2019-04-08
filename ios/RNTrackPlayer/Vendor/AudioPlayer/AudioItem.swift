//
//  AudioItem.swift
//  SwiftAudio
//
//  Created by Jørgen Henrichsen on 18/03/2018.
//

import Foundation
import AVFoundation

public enum SourceType {
    case stream
    case file
}

public protocol AudioItem {
    
    func getSourceUrl() -> String
    func getSourceHeaders() -> NSDictionary?
    func getArtist() -> String?
    func getTitle() -> String?
    func getAlbumTitle() -> String?
    func getSourceType() -> SourceType
    func getArtwork(_ handler: @escaping (UIImage?) -> Void)
    
}

/// Make your `AudioItem`-subclass conform to this protocol to control which AVAudioTimePitchAlgorithm is used for each item.
public protocol TimePitching {
    
    func getPitchAlgorithmType() -> AVAudioTimePitchAlgorithm
    
}

public class DefaultAudioItem: AudioItem {
    
    public var audioUrl: String
    
    public var artist: String?
    
    public var title: String?
    
    public var albumTitle: String?
    
    public var sourceType: SourceType
    
    public var artwork: UIImage?
    
    public var headers: NSDictionary?
    
    public init(audioUrl: String, artist: String? = nil, title: String? = nil, albumTitle: String? = nil, sourceType: SourceType, artwork: UIImage? = nil, headers: NSDictionary?) {
        self.audioUrl = audioUrl
        self.artist = artist
        self.title = title
        self.albumTitle = albumTitle
        self.sourceType = sourceType
        self.artwork = artwork
        self.headers = headers
    }
    
    public func getSourceUrl() -> String {
        return audioUrl
    }
    
    public func getSourceHeaders() -> NSDictionary? {
        return headers
    }
    
    public func getArtist() -> String? {
        return artist
    }
    
    public func getTitle() -> String? {
        return title
    }
    
    public func getAlbumTitle() -> String? {
        return albumTitle
    }
    
    public func getSourceType() -> SourceType {
        return sourceType
    }

    public func getArtwork(_ handler: @escaping (UIImage?) -> Void) {
        handler(artwork)
    }

    
}

/// An AudioItem that also conforms to the `TimePitching`-protocol
public class DefaultAudioItemTimePitching: DefaultAudioItem, TimePitching {
    
    public var pitchAlgorithmType: AVAudioTimePitchAlgorithm
    
    public override init(audioUrl: String, artist: String?, title: String?, albumTitle: String?, sourceType: SourceType, artwork: UIImage?, headers: NSDictionary?) {
        self.pitchAlgorithmType = AVAudioTimePitchAlgorithm.lowQualityZeroLatency
        super.init(audioUrl: audioUrl, artist: artist, title: title, albumTitle: albumTitle, sourceType: sourceType, artwork: artwork, headers: headers)
    }
    
    public init(audioUrl: String, artist: String?, title: String?, albumTitle: String?, sourceType: SourceType, artwork: UIImage?, audioTimePitchAlgorithm: AVAudioTimePitchAlgorithm, headers: NSDictionary?) {
        self.pitchAlgorithmType = audioTimePitchAlgorithm
        super.init(audioUrl: audioUrl, artist: artist, title: title, albumTitle: albumTitle, sourceType: sourceType, artwork: artwork, headers: headers)
    }
    
    public func getPitchAlgorithmType() -> AVAudioTimePitchAlgorithm {
        return pitchAlgorithmType
    }
}
