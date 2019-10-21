//
//  ViewController.swift
//  "No Distractions" for YouTube
//
//  Created by Ulrik Lyngs on 18/05/2019.
//  Copyright © 2019 Ulrik Lyngs. All rights reserved.
//

import Cocoa
import SafariServices.SFSafariApplication

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.appNameLabel.stringValue = "'No Distractions' for YouTube";
    }
    
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "UL.Hide-recommended-videos-on-YouTube.extension") { error in
            if let _ = error {
                // Insert code to inform the user that something went wrong.

            }
        }
    }

}
