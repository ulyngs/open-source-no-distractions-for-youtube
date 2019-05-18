//
//  SafariExtensionViewController.swift
//  Facebook Minimiser Extension
//
//  Created by Ulrik Lyngs on 18/05/2019.
//  Copyright © 2019 Ulrik Lyngs. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
